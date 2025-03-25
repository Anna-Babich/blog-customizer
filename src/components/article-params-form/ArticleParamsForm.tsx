import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { useState, useRef, ElementType } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from '../../constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsForm = {
	stateArticleParamsForm: ArticleStateType;
	setParamsFormState: (data: ArticleStateType) => void;
	articalParamsFormTitle: string;
	as: ElementType;
};

export const ArticleParamsForm = ({
	stateArticleParamsForm,
	setParamsFormState,
	articalParamsFormTitle,
	as,
}: ArticleParamsForm) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	//хук для закрытия сайдбара при клике на оверлей
	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	const [selectParamsState, setSelectParamsState] = useState<ArticleStateType>(
		stateArticleParamsForm
	);
	const handeleChangeSelectedState = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectParamsState({ ...selectParamsState, [key]: value });
	};

	const handleSubmitStateArtical = (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		setParamsFormState(selectParamsState);
	};

	const handleResetStateArtical = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setParamsFormState(defaultArticleState);
		setSelectParamsState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmitStateArtical}
					onReset={handleResetStateArtical}>
					<Text as={as} size={31} weight={800} uppercase>
						{articalParamsFormTitle}
					</Text>
					<Select
						selected={selectParamsState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(options) =>
							handeleChangeSelectedState('fontFamilyOption', options)
						}
						title={'шрифты'}
					/>
					<RadioGroup
						name={'radio'}
						options={fontSizeOptions}
						selected={selectParamsState.fontSizeOption}
						onChange={(options) =>
							handeleChangeSelectedState('fontSizeOption', options)
						}
						title={'размер шрифта'}
					/>
					<Select
						selected={selectParamsState.fontColor}
						options={fontColors}
						onChange={(options) =>
							handeleChangeSelectedState('fontColor', options)
						}
						title={'цвет шрифта'}
					/>

					<Separator />

					<Select
						selected={selectParamsState.backgroundColor}
						options={backgroundColors}
						onChange={(options) =>
							handeleChangeSelectedState('backgroundColor', options)
						}
						title={'Цвет фона'}
					/>
					<Select
						selected={selectParamsState.contentWidth}
						options={contentWidthArr}
						onChange={(options) =>
							handeleChangeSelectedState('contentWidth', options)
						}
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
