import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

export default function RepoStar({ route }) {
  return (
    <WebView source={{ uri: route.params.repo.repo_url }} style={{ flex: 1 }} />
  );
}

RepoStar.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape(),
  }).isRequired,
};
