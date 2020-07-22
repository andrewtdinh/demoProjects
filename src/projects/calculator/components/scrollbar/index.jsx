import React from 'react';
import { scrollBarBGColor, scrollBarTextColor } from '../../constants';
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
	const createDisabledButton = ({ isButtonDisabled, disabledButtonColor }) => {
		return isButtonDisabled
      ? {
					cursor: "default",
					color: disabledButtonColor
        }
      : {}
	}
	// const shiftButtonsStyle = 

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
			>
				{'◀'}
			</div>
			<div className={Styles.scrollBarEntries}>
				{entries.map((entry) => {
					return <span key={entry} onClick={onScrollBarEntryClick} >{entry}</span>;
				})}
			</div>
			<div 
				className={Styles.shiftRight} 
				onClick={onShiftRightClick}
			>
				{'▶'}
			</div>
		</div>
	);
};

export default ScrollBar;
