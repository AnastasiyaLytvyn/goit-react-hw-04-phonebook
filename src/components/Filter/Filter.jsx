import PropTypes from 'prop-types'; 
import css from './Filter.module.css';

export const Filter = ({ onChange, value }) => {
  return (
    <label className={css.label} htmlFor="filter">
      Find contacts by name
      <input
        className={css.input}
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

Filter.propTypes ={
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}