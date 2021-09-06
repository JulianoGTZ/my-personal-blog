import moment from 'moment';
import 'moment/locale/pt-br';

const formatDate = ({ date, mask = 'MMMM D, YYYY' }) => moment(date).locale('en-us').format(mask);



export default formatDate;
