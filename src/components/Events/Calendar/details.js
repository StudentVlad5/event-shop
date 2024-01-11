import PropTypes from 'prop-types';

const Details = (props) => {
    // eslint-disable-next-line react/prop-types
    return <div>{props.data}</div>;
  };
  
  export default Details;

  Details.propTypes = {props : PropTypes.any};
