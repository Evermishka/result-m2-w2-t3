import './App.css';
import styles from './App.module.css';
import { buttons } from './data';
import { useState } from 'react';

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');

	const isResultOperator = operator === '=';

	const displayValue = `${operand1} ${isResultOperator ? '' : operator} ${operand2}`;

	const calculate = () => {
		if (operator === '+') {
			return Number(operand1) + Number(operand2);
		} else if (operator === '-') {
			return Number(operand1) - Number(operand2);
		}
	};

	const numButtonClickHandler = (value) => {
		if (!operator || isResultOperator) {
			setOperand1(operand1 + value);
		} else {
			setOperand2(operand2 + value);
		}
	};

	const operatorButtonClickHandler = (value) => {
		switch (value) {
			case '+':
			case '-':
				setOperator(value);
				if (operand2) {
					setOperand1(calculate());
					setOperand2('');
				}
				break;
			case '=':
				setOperand1(calculate());
				setOperator('=');
				setOperand2('');
				break;
			case 'C':
				setOperand1('');
				setOperator('');
				setOperand2('');
				break;
			default:
				break;
		}
	};

	const clickHandler = (value) =>
		new RegExp('^[0-9]$').test(value)
			? numButtonClickHandler(value)
			: operatorButtonClickHandler(value);

	return (
		<div className="App">
			<div className={styles.calculator}>
				<div
					className={
						isResultOperator
							? styles.display + ' ' + styles.result
							: styles.display
					}
				>
					{displayValue}
				</div>
				<ul className={styles.buttons}>
					{buttons.map((button) => (
						<li key={button}>
							<button
								type="button"
								onClick={() => clickHandler(button)}
								disabled={
									(new RegExp('^[0-9]$').test(button) ||
										button === '=') &&
									isResultOperator
								}
							>
								{button}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
