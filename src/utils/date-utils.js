import moment from 'moment';
import 'moment/locale/pt-br';

const formatDate = ({ date, mask = 'MMMM D, YYYY' }) => {
  return moment(date).locale('pt-br').format(mask);
};



export default formatDate;
