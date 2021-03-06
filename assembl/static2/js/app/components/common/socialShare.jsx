// @flow
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ShareButtons, generateShareIcon } from 'react-share';
import { I18n } from 'react-redux-i18n';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappShareButton,
  TelegramShareButton
} = ShareButtons;

type Props = {
  url: string,
  onClose: () => void,
  social: boolean
};

type State = {
  copied: boolean
};

type SuperShareButtonProps = {
  Component: any => void,
  Icon: any => void,
  url: string,
  onClose: () => void
};

const SuperShareButton = ({ Component, Icon, url, onClose, ...props }: SuperShareButtonProps) => {
  const data = { url: url, onShareWindowClose: onClose };
  return (
    <div className="social-share-button">
      <Component {...data} {...props}>
        <Icon size={32} round />
      </Component>
    </div>
  );
};

export default class SocialShare extends React.Component<Props, State> {
  state = {
    copied: false
  };

  render() {
    const { url, onClose, social } = this.props;
    const { copied } = this.state;
    const SocialNetworks = [
      { Component: FacebookShareButton, iconName: 'facebook' },
      { Component: GooglePlusShareButton, iconName: 'google' },
      { Component: LinkedinShareButton, iconName: 'linkedin' },
      { Component: TwitterShareButton, iconName: 'twitter' },
      { Component: WhatsappShareButton, iconName: 'whatsapp' },
      {
        Component: TelegramShareButton,
        iconName: 'telegram'
      }
    ].map(({ Component, iconName }, index) => (
      <SuperShareButton Component={Component} Icon={generateShareIcon(iconName)} url={url} onClose={onClose} key={index} />
    ));

    return (
      <div className="share-buttons-container">
        {social ? (
          <div className="social-share-buttons-container">{SocialNetworks}</div>
        ) : (
          <div className="social-share-buttons-container">
            <div className="social-share-button">
              <SuperShareButton
                Component={EmailShareButton}
                Icon={generateShareIcon('email')}
                url={url}
                body={url}
                onClose={onClose}
              />
            </div>
          </div>
        )}
        <CopyToClipboard text={url} onCopy={() => this.setState({ copied: true })}>
          <button className="btn btn-default btn-copy">{copied ? I18n.t('debate.linkCopied') : I18n.t('debate.copyLink')}</button>
        </CopyToClipboard>
      </div>
    );
  }
}