import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { useState, useRef, SyntheticEvent } from 'react';
import { fontFamilyOptions, fontColors, fontSizeOptions, backgroundColors, contentWidthArr, defaultArticleState, ArticleStateType, OptionType } from '../../constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsForm = {
	state: ArticleStateType
	setState: (data: ArticleStateType) => void
}

export const ArticleParamsForm = ({state, setState}: ArticleParamsForm) => {
	
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const [selectState, setSelectState] = useState<ArticleStateType>(state);
	const handeleChangeSelectedState = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectState({...selectState, [key]: value});
	}

	const handleSubmitStateArtical = (event: SyntheticEvent) => {
		event.preventDefault();
		setState(selectState);
	}

	const handleResetStateArtical = (event: SyntheticEvent) => {
		setSelectState(state);
	}

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	})

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside className={clsx(styles.container, isOpen && styles.container_open)} ref={rootRef} >
				<form className={styles.form} onSubmit={handleSubmitStateArtical} onReset={handleResetStateArtical}>
					<Text size={31} weight={800} uppercase>
							<h2>Задайте параметры</h2>
					</Text>
					<Select 
						selected={selectState.fontFamilyOption} 
						options={fontFamilyOptions}
						onChange={(options) => handeleChangeSelectedState('fontFamilyOption', options)}
						title={'шрифты'} 
					/>
					<RadioGroup 
						name={'radio'} 
						options={fontSizeOptions} 
						selected={selectState.fontSizeOption}
						onChange={(options) => handeleChangeSelectedState('fontSizeOption', options)}
						title={'размер шрифта'} 
					/>
					<Select 
						selected={selectState.fontColor} 
						options={fontColors}
						onChange={(options) => handeleChangeSelectedState('fontColor', options)}
						title={'цвет шрифта'}
					/>
					
					<Separator />

					<Select 
						selected={selectState.backgroundColor} 
						options={backgroundColors}
						onChange={(options) => handeleChangeSelectedState('backgroundColor', options)}
						title={'Цвет фона'} 
					/>
					<Select 
						selected={selectState.contentWidth} 
						options={contentWidthArr}
						onChange={(options) => handeleChangeSelectedState('contentWidth', options)}
						title={'Ширина контента'} 
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
