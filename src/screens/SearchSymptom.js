import React, { useState, useEffect } from 'react';
let googleTransliterate = require("google-input-tool");

const SearchSymptom = () => {
  // let inputLanguage = "sa-t-i0-und";
  let maxResult = 8;
  let request = new XMLHttpRequest();

  const [inputValue, setInputValue] = React.useState("");
  const [translatedValue, setTranslatedValue] = React.useState("");

  const [selectValue, setSelectValue] = React.useState("");
  // const [inValue, setInValue] = React.useState("");

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };
  // const handleInputChange = event => {
  //   setInputValue(event.target.value);
  // };
  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  React.useEffect(() => {
    googleTransliterate(request, inputValue, selectValue, maxResult).then(
      function (response) {
        console.log(response, "response");
        setTranslatedValue(response[0][0]);
      }
    );
  }, [inputValue]);

  return (
    <div style={{ marginTop: "50px" }}>
      <label>
        Select a value:
        <select value={selectValue} onChange={handleSelectChange}>
          <option value="gu-t-i0-und">Gujarati</option>
          <option value="mr-t-i0-und">Marathi</option>
          <option value="sa-t-i0-und">Sanskrit</option>
        </select>
      </label>
      <br />

      <input
        id="lan"
        type="text"
        name="name"
        onChange={onChangeHandler}
        value={inputValue}
      />

      <h1> {translatedValue} </h1>
      
    </div>
  );
};

export default SearchSymptom;

