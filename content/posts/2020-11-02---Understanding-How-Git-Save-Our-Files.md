---
title: "As estruturas de dados por trás do git"
date: "2020-11-02T22:40:32.169Z"
template: "post"
draft: false
slug: "as-estruturas-de-dados-por-tras-do-git"
category: "Git"
tags:
  - "Git"
  - "Estruturas de dados"
  - "Deep Dive"
description: "Como o Git salva nossos arquivos? Em quais estruturas de dados os nossos arquivos são persistidos? Vamos entender melhor como o Git dispõe seus dados explorando as estruturas de dados existentes por baixo do capô"
socialImage: "/media/git-database-flow.png"
---

![Fluxo do Git. - Fonte: Documentação do Git](/media/git-database-flow.png)
*Fonte: [Documentação do Git](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects)*

Você já se perguntou como o Git persiste nossos arquivos? Como ele consegue lidar com tantos arquivos de forma distribuída? Embora seja praticamente invisível essa persistência possui muitas particularidades interessantes pra quem gosta de **estrutura de dados**.

Vamos entender como funciona?

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/4k5ferlxtghuylh63qrk.gif)

<figure>
	<blockquote>
		<p>Se quiser seguir a leitura interativamente executando os mesmos comandos que utilizei ao longo do post basta clonar o repositório abaixo em um terminal que tenha Git instalado</p>
	</blockquote>
</figure>

`git clone https://github.com/JulianoGTZ/how-git-works.git`

### Estruturas associativas

Segunda a própria documentação o Git é um "content-addressable filesystem", o que na prática se traduz em um clássica estrutura associativa de chave e valor.

Na ciência da computação existem muitas estruturas associativas como: arrays associativos, mapas, tabela de símbolos ou dicionários. Conceitualmente estamos falando de uma estrutura de dados abstrata composta de pares de chave e valor, onde uma determinada chave referencia um valor pelo menos uma vez. 

Embora a matemática seja parte integrante da computação, o termo **associação não tem nada a ver com a propriedade de associação da matemática ou de lógica propositiva**.

Metaforicamente é como se o Git conseguisse buscar um elemento na sua base de dados similar a forma que buscamos o significado de uma palavra em um dicionário. 

**Mas o que git associa? por que termos ele busca?** 

### Hashes everywhere

O git se guia por hashes. Podemos ver isso ao executar um **git-log** e ver vários deles atribuídos a commits.

![Figura do Git Log com muitos commits](/media/hashes-everywhere.jpg)

**Conceituando**: Um hash é uma string de comprimento fixo calculado por algum algoritmo especialista nisso(como MD5, SHA1) onde o objetivo é ter um resultado único respectivo aos parâmetros de entrada.

No caso do git essas chaves podem ser geradas a partir de qualquer sequência de bytes oriundo de qualquer tipo de arquivo. Para cada uma dessas sequências é calculada uma chave do tipo [SHA1](https://en.wikipedia.org/wiki/SHA-1). 

A gente pode brincar com esse algoritmo de geração de chaves. Basta executar em um terminal o seguinte comando:

```bash
$ echo "Artigo da hora" | git hash-object --stdin

$ 43946addf6c6218daaacf8ed7e05af17724262dc
```

E o resultado é sempre o mesmo:

`43946addf6c6218daaacf8ed7e05af17724262dc`

> Precisei utilizar o *echo*, *stdin* e o *|* porque estamos somente utilizando o algoritmo, mas não operando sobre uma sequência de bytes já conhecida pelo git, como um arquivo commitado. Dessa forma estamos enviando uma stream de bytes para o git **hash-object** criptografar

O resultado da função é determínistico, ou seja, dado o mesmo input a função retorna sempre o mesmo resultado. Esse é um dos mecanismo que ajuda a garantir que cada mudança no seu repositório mapeada pelo git seja respectiva ao que de fato foi alterado.

## Commits

Para falarmos sobre a próxima estrutura de dados vamos precisar entender um pouco mais sobre a estrutura dos commits: 

![Commit de atualização do readme](media/commit-update-readme.png)

Com o hash de um commit em mãos podemos utilizar uma função para ler o seu conteúdo: a função **cat-file**. Basta utiliza-lá passando **-p**(print) e o hash que observamos como parâmetros: 

`git cat-file -p 679b79c84959ea166b1fe91b048643a0dd8bd0b2`

Executando o comando vemos as seguintes informações:

![Detalhes do commit de atualização do readme](/media/git-commit-update-readme-detailed.png)

* **tree**: O hash respectivo à estrutura de diretórios e arquivos do repositório(*Mais detalhes abaixo*)
* **parent**: O hash do commit anterior à esse commit.
* **author**: O autor do commit(Nesse caso, **sou eu**) e algumas informações de timestamp.
* **commiter**: O commiter é quem de fato fez o merge de um commit específico. Exemplificando: se você fizer um pull-request para um projeto e um dos membros principais mergeá-lo, vocês dois receberão crédito - você como autor e o membro principal como committer. Também temos informações de timestamp aqui.
* **Update Readme**: A mensagem do commit

Podemos conceituar que o commit é um `snapshot` da atual configuração de todos os arquivos indexados do repositório. Quando digo indexado é tudo que está versionado previamente ou o que passou a ser versionado após o commit.

Esse retrato fiel do repositório está no atributo `tree` do commit. E o que é `tree`?

### Tree

![Atributo tree destacado nos detalhes do commit](/media/tree-highlighted-in-commit-update-readme.png)

Não muito longe da tradução, se trata de uma árvore de referências. Computacionalmente estamos falando de uma estrutura de dados com diferentes ligações entre nós de informações, mas que diferente de uma estrutura linear como um array ou uma lista temos profundidade na navegabilidade. 

Agora que já sabemos como ver a informação dentre um hash do Git, basta executarmos o seguinte comando:

`git cat-file -p 59d80c6ce2b65acdb308058b2b0c97a4358df8f6`

E temos como resultado:

![Resultado do comando executado acima](/media/commit-tree-content.png)

O resultado embora aparentemente não diga muita coisa está representando exatamente a estrutura do repositório que eu estou explorando como exemplo:

![Repositório](/media/image-repository.jpg)

A árvore de versionamento tem dois possíveis tipos de valores armazenados:
* **Blob**: é qualquer arquivo binário do repositório. No caso do exemplo que usei acima é o **README.md**
* **Tree**: Um diretório. Na prática é uma árvore que pode ter várias sub-pastas e arquivos dentro.

A figura abaixo representa exatamente a estrutura de pastas e arquivos do repositório.

![Alt Text](media/how-git-works-tree.png)

Podemos observar que o **nó-folha** (o nó na extremidade da árvore) sempre será um Blob. Na prática isso quer dizer que o Git não versiona pastas vazias. A **tree** só vai existir se existir alguma referência para um arquivo dentro dessa pasta.

<figure>
	<blockquote>
		<p>Os commits são essencialmente referências para novas árvores. Sempre que alteramos algum arquivo, adicionamos um arquivo diferente ou renomeamos uma pasta também estamos reorganizando essa árvore de referências.</p>
	</blockquote>
</figure>

![Documentação do Git](https://git-scm.com/book/en/v2/images/data-model-3.png)

Conforme é mostrado na figura apresentada no início do artigo, estamos sempre gerando novas árvores a cada commit. Como estamos trabalhando em um sistema que utiliza funções determinísticas onde qualquer mínima alteração já torna a estrutura diferente, sempre estamos recriando novas ramificações dentre as múltiplas possíveis versões do nossos arquivos. Fez mais sentido agora o nome **branch**, não?

É interessante saber também que o git possui um sistema de **garbage-collector**. O objetivo é remover arquivos desnecessários de branches antigos que já não fazem mais sentido no repositório. Mas como o Git avalia isso? 

Como é uma estrutura de árvore, ao executar o comando `git gc --prune` por exemplo, o git varre as árvores de versionamento e encontra branches que não tem relação mais com nenhum galho dessa árvore, ou que já está diluido na mesma devido a um merge.

## Um pouco de imutabilidade

Se você já viu algum conteúdo sobre programação funcional já deve ter lido a palavra **imutabilidade**. A princípio quem trabalha com linguagens que não suportam nativamente isso acha o conceito um pouco estranho. *Se eu programo abstrações como classes, interfaces e funções genéricas porque seria interessante não ter variáveis?*

![cena famosa que um guarda pede calma](https://media.giphy.com/media/XEo7YJHUeplXa/giphy.gif)

Calma, não é exatamente disso que imutabilidade trata. Na verdade, o conceito de imutabilidade é sobre deixar acessível um determinado valor mesmo que a sua referência direta tenha mudado. E sobre deixar um valor específico ainda acessível para computações que precisem enxergar aquele valor futuramente.

Na prática isso quer dizer o quê? 

Os comandos que existem para alteração de commits como **git rebase** ou **git ammend** reescrevem commits, e não os altera diretamente. Ao reescrever um novo commit estamos definindo novos atributos como: timestamp, novo autor ou novas alterações nos **blobs** e por consequências nas **trees**.

Não estamos fazendo uma alteração clássica de valor de uma variável como na programação, mas sim reescrevendo uma nova referência e preservando a antiga. Se essa estrutura não fosse imutável a cada vez que fizessemos um rebase mudaríamos também todas as referências de todos os outros branches no repositório que conhecem aqueles mesmos arquivos.

**Thanks Imutabilidade**

## Para saber mais

Tem bem mais conteúdo sobre como funciona o git internamente como: Branchs, Tags, Merge vs Rebase, as três áreas do Git, Fast-Foward, HEAD..Prometo trazer isso em futuros artigos.

Deixo algumas recomendações de conteúdo caso você queira entender mais a fundo as referências de estudo que existem nesse artigo:
* [O livro Git PRO - Gratuito online](https://git-scm.com/book/en/v2)
* [Vídeo do Fabio Akita - Entendendo GIT | (não é um tutorial!)](https://www.youtube.com/watch?v=6Czd1Yetaac&t=10s)
* [Vídeo do Paolo Perrota explicando como o Git funciona](https://www.youtube.com/watch?v=nHkLxts9Mu4)
* [Curso How Git Works - Pluralsight](https://www.pluralsight.com/courses/how-git-works)

*See you later o/*
