import React, { useState, useEffect } from 'react'

const App = () => {

  //Fetch JSON
  const [carsData, setCarsData] = useState([])
  const [citiesData, setCitiesData] = useState([])
  const [purposesData, setPurposesData] = useState([])

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/gh/Zenotorith/json-cost-calculator/cars.json')
      .then((res) => res.json())
      .then(carsData => {
        setCarsData(carsData)
      });
  }, [])

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/gh/Zenotorith/json-cost-calculator/cities.json')
      .then((res) => res.json())
      .then((citiesData) => 
        setCitiesData(citiesData)
      )
  }, [])

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/gh/Zenotorith/json-cost-calculator/purposes.json')
    .then((res) => res.json())
    .then(purposesData => {
      setPurposesData(purposesData)
    });
  }, [])
  //End Fetch Json


  // GET Cars's values
  const [{car, color}, setCars] =useState({
    car: "",
    color: ""
  })
  const [carSeats, setcarSeats] = useState(0)

  const carsName = carsData.map(car => (
    <option
      key={car.name} 
      value={car.name}
    >
      {car.name}
    </option>
  ))
  // End GET Cars's values

  //GET Colors's values
  const colors = carsData.find(item => item.name === car)?.colors.map((color) =>(
    <option
      key={color}
      value={color}
    >
      {color}
    </option>
  ))
  const carPrice = carsData.filter(item => item.name === car).map(car => (car.price))
  //End GET Colors's values

  // GET Cities and Purposes's values
  const [city, setCity] = useState("")
  const [purpose, setPurpose] = useState("")
  const [checkoutTax, setCheckoutTax] = useState(0)

  const cities = citiesData.map(city => (
    <option
      key={city.name} 
      value={city.name}
    >
      {city.name}
    </option>
  ))

  const cityRegTax = citiesData.filter(item => item.name === city).map(city => (city.carRegistrationTax))
  const cityNumberPlateTax = citiesData.filter(item => item.name === city).map(city => (city.carNumberPlateRegistrationTax))
  
  const purposes = purposesData.map(purpose => (
    <option
      key={purpose.name}
      value={purpose.name}
    >
      {purpose.name}
    </option>
  ))
  
  const roadMaintainaceTax = purposesData.filter(item => item.name === purpose).map(purpose => (purpose.roadMaintainaceTax))
  const insurance = carSeats === 0?
    (0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):
    0 < carSeats < 7?
    (480000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):
    7 < carSeats < 11?
    (873000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):
    (1026000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  // End GET Cities and Purposes's values
  
  //Handle Event
  const [isShow, setIsShow] = useState(true)
  const HandleCarChange = (e) => {
    setCars(data => ({car: e.target.value, color: ''}))
    setIsShow(false)
  }

  const HandleColorChange = (e) => {
    setCars(data => ({...data, color: e.target.value}))
  }


  const HandleCityChange = (e) => {
    setCity(e.target.value)
    setcarSeats(carsData.filter(item => item.name === car).map(car => (car.seats)))
    setCheckoutTax(340000)
    setPurpose("C?? nh??n")
  }

  const HandlePurposeChange = (e) => {
    setPurpose(e.target.value)
  }

  return (

  <div className="container">
    <div className="row">
      <div className="col-md-8 form--holder">
        <div className="row">
          <div className="col price--col__ouput">
            <form className="d-flex flex-column input--form">
              <h2 className="text-center d-inline-block d-xl-flex justify-content-xl-center heading--center">Trang d??? to??n chi ph?? l??n b??nh</h2>
              <div className="row form--row">
                <div className="col-md-6 form--column__car"><label className="form-label label--form__input">M???u xe *</label>
                  <select value={car} key={car} className="form-select selector--form__model" onChange={HandleCarChange}>
                    <option value ={0} hidden>Vui l??ng ch???n</option>
                    {carsName}
                  </select>
                </div>
                <div className="col-md-6 form--column__color"><label className="form-label label--form__input">M??u s???c *</label>
                  <select value={color} key={color} className="form-select selector--form__model" onChange={HandleColorChange} disabled={isShow}>
                    <option value ={0} disabled={!isShow}>Vui l??ng ch???n m???u xe</option>
                    {colors}
                  </select>
                </div>
              </div>
              <div className="row form--row">
                <div className="col-md-6 form--column__location" disabled><label className="form-label label--form__input">N??i ????ng k?? *</label>
                  <select value={city} key={city} className="form-select selector--form__model" onChange={HandleCityChange} disabled={isShow}>
                    <option value ={0} hidden>Vui l??ng ch???n</option>
                    {cities}
                  </select>
                </div>
                <div className="col-md-6 form--column__purpose" disabled><label className="form-label label--form__input">M???c ????ch s??? d???ng *</label>
                  <select value={purpose} key={purpose} className="form-select selector--form__model" onChange={HandlePurposeChange} disabled={isShow}>
                    {purposes}
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row" style={{marginTop: '32px'}}>
          <div className="col form__output">
            <h2 className="text-center heading--center">K???t qu???</h2>
            <div className="row">
              <div className="col-md-3">
                <p className="label--form__result">Gi?? ni??m y???t:</p>
              </div>
              <div className="col price--col__ouput">
                <p className="text-end ouput--form">{(+carPrice).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}<span>??</span></p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <p className="label--form__result">Ph?? tr?????c b???:</p>
              </div>
              <div className="col price--col__ouput">
                <p className="text-end ouput--form">{(+cityRegTax * carPrice).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}<span>??</span></p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <p className="label--form__result">Ph?? ????ng k??, c???p bi???n s??? xe:</p>
              </div>
              <div className="col price--col__ouput">
                <p className="text-end ouput--form">{(+cityNumberPlateTax).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}<span>??</span></p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <p className="label--form__result">Ph?? ????ng ki???m:</p>
              </div>
              <div className="col price--col__ouput">
                <p className="text-end ouput--form">{(+checkoutTax).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}<span>??</span></p>
              </div>
            </div>
              <div className="row">
                <div className="col-md-3">
                  <p className="label--form__result">Ph?? b???o tr?? ???????ng b??? (1 n??m):</p>
                </div>
                <div className="col price--col__ouput">
                  <p className="text-end ouput--form">{(+roadMaintainaceTax * 12).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}<span>??</span></p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <p className="label--form__result">B???o hi???m d??n s??? (b???t bu???c):</p>
                </div>
                <div className="col price--col__ouput">
                  <p className="text-end ouput--form">{insurance}<span>??</span></p>
                </div>
              </div>
              <hr/>
              <div className="row" style={{marginTop: '51px'}}>
                <div className="col-md-3">
                  <p className="label--form__result">T???ng:</p>
                </div>
                <div className="col price--col__ouput">
                  <p className="text-end ouput--form">{(+carPrice + +(cityRegTax * carPrice) + +cityNumberPlateTax + +checkoutTax + (+roadMaintainaceTax * 12)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}<span>??</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div className="col-md-4 image-holder"></div>
    </div>
  </div>
  );
}

export default App;
