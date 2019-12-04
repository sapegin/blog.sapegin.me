import React from 'react';
import { Box, Text } from 'tamia';
import { Link } from 'tamia-gatsby-link';

export const lang = 'ru';
export const title = 'Наноблог Артёма Сапегина';
export const description =
	'Блог фронтенд-разработчика, который живёт в Берлине, работает в Вейфейре, фотографирует, пишет, гладит собак и пьёт кофе.';
export const siteUrl = 'https://nano.sapegin.ru';
export const author = 'Артём Сапегин';
export const twitter = '@iamsapegin';
export const aboutTitle = 'Обо мне';
export const relatedTitle = 'Читайте также';
export const subscribeTitle = 'Рассылка';
export const subscribeInfo =
	'Подпишитесь на рассылку, чтобы получать новые статьи по почте.';
export const discussPost = 'Обсудить в твитере';
export const editPost = 'Отредактировать на Гитхабе';
export const subscriptionEmailLabel = 'Эл. почта';
export const subscriptionSubmitLabel = 'Подписаться';

export const Intro = () => (
	<Box mb="l">
		<Text variant="italic">
			Новые посты будут выходить только{' '}
			<Link href="https://blog.sapegin.me/">на английском языке</Link>.
		</Text>
	</Box>
);

export const LongDescription = () => (
	<>
		<Text mb="m" variant="small">
			Я живу в Берлине и работаю фронтенд-разработчиком в{' '}
			<Link href="https://omio.com/">Омио</Link>, а в свободное время
			фотографирую, глажу своих собак и пью кофе.
		</Text>
		<Text mb="m" variant="small">
			Читайте обо мне <Link href="https://sapegin.me/">на моём сайте</Link> и
			подписывайтесь{' '}
			<Link href="https://morning.photos/">на мой блог о фотографии</Link> и{' '}
			<Link href="https://twitter.com/iamsapegin">твитер</Link>.
		</Text>
	</>
);

export const PublishedOn = ({ date }: { date: string }) => (
	<>Опубликовано {date}</>
);

export const PoweredBy = () => (
	<>
		Работает на <Link href="https://www.gatsbyjs.org/">Гетсби</Link> и{' '}
		<Link href="http://tamiadev.github.io/tamia/">Тамии</Link>, хостится на{' '}
		<Link href="https://www.netlify.com/">Нетлифае</Link>
	</>
);
