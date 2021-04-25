import { useState, useEffect, useRef } from 'react';
import useOutSideClickEffect from "../hooks/useOutsideClickEffect";
import { hexToRgb, rgbToHex } from "../helpers";

const ColorPicker = ({value, colors, onChange}) => {

  const refContainer = useRef(null);
  const [localValue, setLocalValue] = useState('');
  const [colorsListActive, setColorsListToggle] = useState(false);
  const [colorsCustomActive, setColorsCustomToggle] = useState(false);
  const {isOutsideClicked} = useOutSideClickEffect(refContainer);
  const [rgbObj, setRgbObj] = useState({
    r: 0,
    g: 0,
    b: 0
  })

  useEffect(() => {
    updateRgb();
  }, [value]);

  useEffect(() => {
    if(isOutsideClicked) {
      setColorsListToggle(false);
      setColorsCustomToggle(false);
      updateRgb();
    }
  }, [isOutsideClicked]);

  useEffect(() => {
    setLocalValue(rgbToHex(rgbObj));
  }, [rgbObj]);

  const updateRgb = () => {
    const rgb = hexToRgb(value);
    const [r, g, b] = rgb;
    setRgbObj({r, g, b});
  }

  const onChangeRgbRange = (value, type) => {
    switch (type) {
      case 'r':
        setRgbObj({...rgbObj, r: +value})
        break;
      case 'g':
        setRgbObj({...rgbObj, g: +value})
        break;
      case 'b':
        setRgbObj({...rgbObj, b: +value})
        break;
      default:
        alert('Something went wrong');
    }
  }

  const saveColor = () => {
    onChange(localValue);
    setColorsCustomToggle(false);
  }

  const eventColorsList = (hex) => {
    setColorsListToggle(false);
    onChange(hex);
  }

  const resetChanges = () => {
    setColorsCustomToggle(false);
    setLocalValue(value);
    updateRgb();
  }

  const rgbArr = [];

  for (let key in rgbObj) {
    rgbArr.push(
      {
        key,
        value: rgbObj[key]
      }
    )
  }

  return (
    <div className='color-picker'
         ref={refContainer}>
      <div className="color-picker-wrap">
        <span className='color-picker-value'>{value}</span>
        <button
          className='btn-square btn-default-colors'
          onClick={() => {
            setColorsCustomToggle((state) => !state);
            setColorsListToggle(false);
          }}>
          <div
            className='color-preview'
            style={{ backgroundColor: `#${localValue}` }}>
          </div>
        </button>
        <button
          className='btn-square btn-custom-colors'
          onClick={() => {
            setColorsListToggle((state) => !state);
            setColorsCustomToggle(false);
          }}>
        </button>
      </div>
      {
        colorsListActive
        ?
        <ul className="colors-list">
          {
            colors.map(({name, hex}, idx) => {
              return (
                <li key={idx} onClick={() => eventColorsList(hex)}>
                  <span className='color-name'>{name}</span>
                  <div className="color-preview" style={{backgroundColor: `#${hex}`}}>
                  </div>
                </li>
              )
            })
          }
        </ul>
        :
        null
      }
      {
        colorsCustomActive
        ?
          <div className='custom-colors-wrap'>
            {
              rgbArr.map(({key, value}) => {
                return (
                  <div className="color-range-block" key={key}>
                    <span className="key">{key}</span>
                    <div className="color-range">
                      <input
                        min="0"
                        max="255"
                        type="range"
                        value={value}
                        className={`slider slider-${key}`}
                        onChange={(e) => onChangeRgbRange(e.target.value, key)}/>
                    </div>
                  </div>
                )
              })
            }
            <div className="btns-holder">
              <button className="btn btn-secondary" onClick={resetChanges}>Cancel</button>
              <button className="btn btn-primary" onClick={saveColor}>Ok</button>
            </div>
          </div>
        :
        null
      }
    </div>
  )
}

export default ColorPicker;