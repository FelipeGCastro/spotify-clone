import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayerActions from '~/store/ducks/player';

import {
  Container,
  CoverBackground,
  EpisodeInfo,
  Title,
  Author,
  Controls,
  ControlButton,
  ControlIcon,
} from './styles';

const Player = ({
  player, currentEpisode, play, pause, next, prev,
}) => player.current && (
<Container>
  <CoverBackground source={{ uri: currentEpisode.artwork }} />
  <EpisodeInfo>
    <Title>{currentEpisode.title}</Title>
    <Author>{currentEpisode.artist}</Author>
  </EpisodeInfo>

  <Controls>
    <ControlButton onPress={() => prev()}>
      <ControlIcon name="skip-previous" />
    </ControlButton>

    <ControlButton onPress={() => (!player.playing ? play() : pause())}>
      <ControlIcon name={!player.playing ? 'play-circle-filled' : 'pause-circle-filled'} />
    </ControlButton>

    <ControlButton onPress={() => next()}>
      <ControlIcon name="skip-next" />
    </ControlButton>
  </Controls>
</Container>
);

const mapStateToProps = state => ({
  player: state.player,
  currentEpisode: state.player.podcast
    ? state.player.podcast.tracks.find(episode => episode.id === state.player.current)
    : null,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlayerActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);
