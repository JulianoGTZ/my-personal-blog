import moment from 'moment';
import 'moment/locale/pt-br';

const formatDate = ({ date }) => {
  return moment(date).locale('pt-br').format('MMMM D, YYYY');
};

export default formatDate;
