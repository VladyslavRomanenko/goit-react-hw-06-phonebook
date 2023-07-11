import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { getFilter } from 'redux/slice';

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleFilter = event => {
    dispatch(getFilter(event.target.value));
  };
  return (
    <div className={css.filter}>
      <h2 className={css.title}>Find contacts by name</h2>
      <input
        type="text"
        name="filter"
        className={css.input}
        onChange={handleFilter}
        value={filter}
      />
    </div>
  );
};

export default Filter;
