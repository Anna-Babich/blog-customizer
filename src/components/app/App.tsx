import { CSSProperties, useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [articalState, setArticalState] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articalState.fontFamilyOption.value,
					'--font-size': articalState.fontSizeOption.value,
					'--font-color': articalState.fontColor.value,
					'--container-width': articalState.contentWidth.value,
					'--bg-color': articalState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				stateArticleParamsForm={articalState}
				setParamsFormState={setArticalState}
				articalParamsFormTitle='Задайте параметры'
				as='h2'
			/>
			<Article />
		</main>
	);
};
