import { useState, useEffect, useCallback } from "react";
import { Button } from "./components/Button";
import { Display } from "./components/Display";

const buttonValues = [
  ["C", "±", "%", "÷"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

function Calculator() {
  let [calculator, setCalculator] = useState({
    number: 0,
    sign: "",
    result: 0,
  });

  const resetDisplay = () => {
    setCalculator({
      ...calculator,
      number: 0,
      sign: "",
      result: 0,
    });
  };

  const toggleSign = () => {
    setCalculator({
      ...calculator,
      number: calculator.number ? calculator.number * -1 : 0,
      sign: "",
      result: calculator.result ? calculator.result * -1 : 0,
    });
  };

  const percentHandler = () => {
    let number = calculator.number ? parseFloat(calculator.number) : 0;
    let result = calculator.result ? parseFloat(calculator.result) : 0;

    setCalculator({
      ...calculator,
      number: (number /= Math.pow(100, 1)),
      sign: "",
      result: (result /= Math.pow(100, 1)),
    });
  };

  const inputDigit = (e) => {
    const value = e.target.innerHTML;

    setCalculator({
      ...calculator,
      number: Number(calculator.number + value),
      result: !calculator.sign ? 0 : calculator.result,
    });
  };

  const addDot = (e) => {
    const value = e.target.innerHTML;

    setCalculator({
      ...calculator,
      number: !calculator.number.toString().includes(".")
        ? calculator.number + value
        : calculator.number,
    });
  };

  const inputSign = (e) => {
    const value = e.target.innerHTML;

    setCalculator({
      ...calculator,
      sign: value,
      number: 0,
      result:
        !calculator.result && calculator.number
          ? calculator.number
          : calculator.result,
    });
  };

  const computeOperation = (number1, number2, sign) => {
    switch (sign) {
      case "+":
        return number1 + number2;
        break;
      case "-":
        return number1 - number2;
        break;
      case "x":
        return number1 * number2;
        break;
      default:
        return number1 / number2;
        break;
    }
  };

  const equalsHandler = () => {
    if (calculator.sign && calculator.number) {
      setCalculator({
        ...calculator,
        result:
          calculator.number === "0" && calculator.sign === "÷"
            ? 0
            : computeOperation(
                Number(calculator.result),
                Number(calculator.number),
                calculator.sign
              ),

        sign: "",
        number: 0,
      });
    }
  };

  const checkButtonValue = (e) => {
    const value = e.target.innerHTML;
    switch (value) {
      case "C":
        resetDisplay();
        break;
      case "±":
        toggleSign();
        break;
      case "%":
        percentHandler();
        break;
      case ".":
        addDot(e);
        break;
      case "÷":
        inputSign(e);
        break;
      case "x":
        inputSign(e);
        break;
      case "-":
        inputSign(e);
        break;
      case "+":
        inputSign(e);
        break;
      case "=":
        equalsHandler();
        break;
      default:
        inputDigit(e);
        return;
    }
  };

  // KeyDown Press Functions

  const handleDigitPress = (value) => {
    setCalculator((prev) => {
      return {
        ...calculator,
        number: Number(`${prev.number}${value}`),
        result: !prev.sign ? 0 : prev.result,
        sign: prev.sign,
      };
    });
  };

  const handleSignPress = (value) => {
    setCalculator((prev) => {
      return {
        ...calculator,
        sign: value,
        number: 0,
        result: !prev.result && prev.number ? prev.number : prev.result,
      };
    });
  };

  const handleEqualsPress = () => {
    setCalculator((prev) => {
      if (prev.sign) {
        return {
          result: computeOperation(
            Number(prev.result),
            Number(prev.number),
            prev.sign
          ),
          sign: "",
          number: 0,
        };
      } else {
        return { ...calculator };
      }
    });
  };

  const handlePercentPress = () => {
    setCalculator((prev) => {
      let number = prev.number ? parseFloat(prev.number) : 0;
      let result = prev.result ? parseFloat(prev.result) : 0;
      return {
        number: (number /= Math.pow(100, 1)),
        sign: "",
        result: (result /= Math.pow(100, 1)),
      };
    });
  };

  const handleDotPress = () => {
    setCalculator((prev) => {
      return {
        ...calculator,
        number: !prev.number.toString().includes(".")
          ? prev.number + "."
          : prev.number,
        sign: prev.sign,
        result: prev.result,
      };
    });
  };

  const handleKeyPress = useCallback((event) => {
    const { code, key } = event;
    console.log(key);

    switch (key) {
      case "Escape":
        resetDisplay();
        break;
      case "0":
        handleDigitPress(0);
        break;
      case "1":
        handleDigitPress(1);
        break;
      case "2":
        handleDigitPress(2);
        break;
      case "3":
        handleDigitPress(3);
        break;
      case "4":
        handleDigitPress(4);
        break;
      case "5":
        handleDigitPress(5);
        break;
      case "6":
        handleDigitPress(6);
        break;
      case "7":
        handleDigitPress(7);
        break;
      case "8":
        handleDigitPress(8);
        break;
      case "9":
        handleDigitPress(9);
        break;
      case "+":
        handleSignPress("+");
        break;
      case "-":
        handleSignPress("-");
        break;
      case "*":
        handleSignPress("x");
        break;
      case "/":
        handleSignPress("÷");
        break;
      case "%":
        handlePercentPress();
        break;
      case ".":
        handleDotPress();
        break;
      case "Enter":
        handleEqualsPress();
        break;
      default:
        return;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <main>
      <div className="container">
        <Display
          value={calculator.number ? calculator.number : calculator.result}
        />
        <div className="buttons-wrapper">
          {buttonValues.flat().map((buttonValue, index) => {
            return (
              <Button
                key={index}
                className="button"
                value={buttonValue}
                onClick={(e) => checkButtonValue(e)}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Calculator;
