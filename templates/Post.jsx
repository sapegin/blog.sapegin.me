import Base from './Base';
import PostMeta from './components/PostMeta';

export default function($) {
	const { title, content, unpublished, medium, sourcePath } = $;
	const { typo, typoTitle, option, Script, __ } = $;
	return (
		<Base {...$}>
			<article class="note">
				<h1 class="note-title">{typoTitle(title)}</h1>

				{unpublished &&
					<p class="note-draft">This is a draft post, please don’t share it until it’s published.</p>
				}

				<div class="note-content text">
					{typo(content)}
				</div>

				{medium &&
					<p class="note-feedback no-print">{__('postComments', { url: `https://medium.com/@sapegin/${medium}` })}</p>
				}

				<p class="note-feedback no-print">{__('postFeedback', { url: `https://github.com/sapegin/blog.sapegin.me/edit/master/source/${sourcePath}` })}</p>
				
				<PostMeta {...$} />

				{!unpublished &&
					<div class="note-share">
						<div class="social-likes" data-title={title}>
							<div
								data-service="facebook"
								title={__('shareOnFacebook')}
							>
								{__('facebook')}
							</div>
							<div
								data-service="twitter"
								data-via={option('twitterName')}
								title={__('shareOnTwitter')}
							>
								{__('twitter')}
							</div>
						</div>
					</div>
				}
			</article>

			<div class="about-author media no-print">
				<div class="about-author__picture media__img">
					<img src="/images/userpic.jpg" width="75" height="75" alt={option('author')} />
				</div>
				<div class="media__body">
					{typo(__('longDescription'))}
				</div>
			</div>

			<Script src="/build/main.js" />
		</Base>
	);
}
