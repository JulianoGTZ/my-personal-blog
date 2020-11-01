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
description: "Como o Git salva nossos arquivos? Como ele entende exatamente que mudanças fazemos? Por que tantos hashes?"
socialImage: "/media/git-database-flow.png"
---

![Fluxo do Git. - Fonte: Documentação do Git](/media/git-database-flow.png)
*Fonte: [Documentação do Git](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects)*

Você já se perguntou como o Git persiste nossos arquivos? Como ele consegue lidar com tantos arquivos de forma distribuída? Embora seja praticamente invisível essa persistência possuí muitas particularidades interessantes pra quem gosta de **estrutura de dados**.

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

Na ciência da computação há muitas estruturas associativas como: arrays associativos, mapas, tabela de símbolos ou dicionários. Conceitualmente estamos falando de uma estrutura de dados abstrata composta de pares de chave e valor, onde uma determinada chave referencia um valor pelo menos uma vez. 

Embora a matemática seja parte integrante da computação, o termo **associação não tem nada a ver com a propriedade de associação da matemática ou de lógica propositiva**.

Isso quer dizer o Git consegue consegue buscar um elemento na sua base de dados similar a forma que buscamos um significado de uma palavra em um dicionário. 

**Mas o que git associa? por que termos ele busca?** 

### Hashes everywhere

O git se guia por hashes. Podemos ver isso ao executar um **git-log** e ver vários deles atribuídos a commits.

**[adicionar imagem aqui]**

Conceituando: Um hash é uma string de comprimento fixo calculado por algum algoritmo especialista nisso(como MD5, SHA1) onde o objetivo é ter um resultado único respectivo a um determinado parâmetro de entrada.

No caso do git essas chaves podem ser geradas a partir de qualquer sequência de bytes oriundo de qualquer tipo de arquivo. Para cada uma dessas sequências é calculada uma chave do tipo [SHA1](https://en.wikipedia.org/wiki/SHA-1). 

A gente pode brincar com esse algoritmo. Basta executar em um terminal o seguinte comando:

```bash
$ echo "Artigo da hora" | git hash-object --stdin

$ 43946addf6c6218daaacf8ed7e05af17724262dc
```

E o resultado é sempre o mesmo:

`43946addf6c6218daaacf8ed7e05af17724262dc`

> Precisei utilizar o *echo*, *stdin* e o *|* porque estamos somente utilizando o algoritmo, mas não operando sobre uma sequência de bytes já conhecida pelo git, como um arquivo commitado. Dessa forma estamos enviando uma stream de bytes para o git **hash-object** criptografar

O resultado da função é determínistico, ou seja, dado o mesmo input a função retorna sempre o mesmo resultado. Essa é a forma de garantir que cada mudança no seu repositório mapeada pelo git seja exclusiva ao que de fato foi alterado.

## Commits

Para falarmos sobre a próxima estrutura de dados do Git vamos precisar entender um pouco mais sobre a estrutura dos commits. Através do comando `git-log` podemos identificar qual é a chave calculada para um determinado commit. Vamos analisar o seguinte commit como exemplo:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/7hliz7tjl5ovnvrqaa5t.png)

Agora que nós sabemos o hash, podemos utilizar uma função do próprio Git para ler o seu conteúdo: a função **cat-file**. Basta utilizar essa função passando **-p**(print) e o hash que observamos como parâmetros: 

`git cat-file -p 59d80c6ce2b65acdb308058b2b0c97a4358df8f6`

Executando o comando, vemos as seguintes informações(Se você estiver analisando um commit com alguma chave gpg associada podem ser que apareçam mais campos):

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/wf4uchwtrdmpeda9xgrn.png)

* *Tree*: O hash respectivo a estrutura de diretório da pasta raiz do repositório(Mais detalhes em breve)
* *Author*: O autor do commit(Nesse caso, **sou eu**) e algumas informações de timestamp
* *commiter*: Contém informações de cadastro do repositório do autor commit e alguns valores de timestamp
* *First Commit*: A mensagem do commit

Podemos conceituar que o commit é um `snapshot` da atual configuração de todos os arquivos indexados do repositório. Quando digo indexado é tudo que está versionado previamente ou o que passou a ser versionado após o commit.

Esse retrato fiel do repositório está no atributo `tree` do commit. E o que é `tree`?

### Tree

Não muito longe da tradução, se trata de uma árvore de referências. Computacionalmente estamos falando de uma estrutura de dados com diferentes ligações entre nós de informações, mas que diferente de uma estrutura linear como um array ou uma lista temos profundidade na navegabilidade. Abaixo segue um exemplo de uma árvore binária:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/4ealcra9lay6gdn7j8wi.png)

### Propriedades de uma árvore

:
* **Nó Raiz**: Nó topo da árvore, da qual descendem os demais nós.()
* **Nó Interior**: Nó do interior da árvore que possuí descendentes
* **Nó folha**: Também denominado como nó terminal, é um nó que não possui mais descendentes e está na extremidade da árvore.
* **Trajetória**: São os nós percorridos ao longo da árvore até se chegar a uma nó específico

Diferente das **árvores binárias**, que pela definição cada nó só pode apontar para no máximo duas referências, a árvore de versionamento pode ter `n` referências da mesma forma que dentro de uma pasta podem haver `n`subpastas e `n` arquivos.

Já sabemos como ver a informação dentre um hash do Git. Basta utilizarmos o **git cat-file -p** e passar o hash da tree:

`git cat-file -p 59d80c6ce2b65acdb308058b2b0c97a4358df8f6`

Na computação o que vemos de otimizado em árvores em relação à outras estruturas de dados é a sua navegabilidade, desde que haja um balanceamento entre os nós como árvores [B](https://www.ime.usp.br/~pf/estruturas-de-dados/aulas/B-trees.html), [AVL](https://pt.wikipedia.org/wiki/%C3%81rvore_AVL) ou [Rubro-Negras](https://pt.wikipedia.org/wiki/%C3%81rvore_rubro-negra). 

### Árvore de versionamento

Diferente desse cenário, o git não se aproveita das vantagens de busca em árvores especificamente, mas sim em otimizar o reaproveitamento das referências desses nós. Guardar os dados dessa forma resolve o problema de armazenar nomes de arquivos, além de que é possível agrupar arquivos do mesmo contexto.



## Um pouco de imutabilidade

Se você já viu algum conteúdo sobre programação funcional já deve ter lido a palavra **imutabilidade**. A princípio quem trabalha com linguagens que não suportam nativamente isso como javascript, Java ou C e tantas outras acho o conceito um pouco estranho. Se eu programo abstrações como classes, interfaces e funções genéricas porque seria interessante não ter variáveis?

Não é exatamente disso que imutabilidade trata. Na verdade, o conceito é imutabilidade é sobre deixar acessível um determinado valor mesmo que a sua referência direta tenha mudado. Um valor específico ainda vai ficar acessível para computações que ainda precisam enxergar aquele valor, ou podem acessar futuramente.

Através de alguns comandos do git como **rebase** e **amend** nós temos o poder de rescreever a história do commit.

![Alt Text](https://media.giphy.com/media/RfEbMBTPQ7MOY/giphy.gif)

## Para saber mais

Tem bem mais conteúdo sobre como funciona o git internamente como: Branchs, Tags, Merge vs Rebase, as três áreas do Git, Fast-Foward, HEAD..Prometo trazer isso em futuros artigos.

Deixo algumas recomendações de conteúdo caso você queira entender mais a fundo as referências de estudo que existem nesse artigo:
* [O livro Git PRO - Gratuíto online](https://git-scm.com/book/en/v2)
* [Vídeo do Fabio Akita, explicando fundamentos de GIT](https://www.youtube.com/watch?v=6Czd1Yetaac&t=10s)
* [Vídeo do Paolo Perrota explicando como o Git funciona](https://www.youtube.com/watch?v=nHkLxts9Mu4)
* [Curso fantástisco do Pluralsight](https://www.pluralsight.com/courses/how-git-works)

*See you later o/*
