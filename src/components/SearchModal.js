import React, {useState} from "react";
import "./searchModal.scss";
import {connect} from 'react-redux'
import weatherAction from '../redux/actions/weatherActions'

const SearchModal = (props) => {

  const [searchVal, setSearchVal] = useState('')

  const handleSearch = () => {
      props.fetchWeatherData(searchVal)
      setSearchVal('')
      props.closeModal()
  }

  return (
    <div className="search-modal-overlay">
      <div className="modal-content">
        <div className="row search-input">
          <div className="input-field col s12">
            <i className="material-icons prefix">search</i>
            <input id="icon_prefix" type="text" className="validate" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} />
            <label htmlFor="icon_prefix">Search city</label>
          </div>
        </div>
        <button className="teal btn btn-large search-btn" onClick={handleSearch}>Search</button>
      </div>
      <span className="material-icons cross-icon" onClick={() => props.closeModal()}>clear</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
    return{
        fetchWeatherData: (searchTerm) => dispatch(weatherAction.fetchWeatherData(searchTerm)),
    }
}
 
export default connect(null, mapDispatchToProps)(SearchModal);
