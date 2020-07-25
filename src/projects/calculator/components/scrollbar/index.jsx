import React from 'react';
import { scrollBarBGColor, scrollBarTextColor } from '../../constants';
import getRandomInteger from '../../utils/getRandomInt';
import Styles from '../../index.module.css';

const ScrollBar = ({
	bgColor = scrollBarBGColor,
	textColor = scrollBarTextColor,
	entries = [],
	onShiftLeftClick,
	onShiftRightClick,
	onScrollBarEntryClick,
	isLeftShiftBtnDisabled,
	isRightShiftBtnDisabled,
}) => {
	const disabledShiftBtnColor = '#675c5c';
	const createDisabledBtnStyle = ({ isButtonDisabled, disabledButtonColor }) => {
		return isButtonDisabled ? {cursor: "default", color: disabledButtonColor} : {};
	}
	return (
		<div
			className={Styles.scrollBar}
			style={{
				backgroundColor: bgColor,
				color: textColor
			}}
		>
			<div 
				className={Styles.shiftLeft} 
				onClick={onShiftLeftClick}
				style={createDisabledBtnStyle({ 
					isButtonDisabled: isLeftShiftBtnDisabled, 
					disabledButtonColor: disabledShiftBtnColor })
				}
			>
				{'◀'}
			</div>
			<div className={Styles.scrollBarEntries}>
				{entries.map((entry) => {
					const randomNum = getRandomInteger();
					return <span key={randomNum} onClick={onScrollBarEntryClick} >{entry}</span>;
				})}
			</div>
			<div 
				className={Styles.shiftRight} 
				onClick={onShiftRightClick}
				style={createDisabledBtnStyle({ 
					isButtonDisabled: isRightShiftBtnDisabled, 
					disabledButtonColor: disabledShiftBtnColor })
				}
			>
				{'▶'}
			</div>
		</div>
	);
};

export default ScrollBar;
