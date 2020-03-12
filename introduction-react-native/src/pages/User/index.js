import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape(),
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    starsLoading: false,
    page: 1,
    refreshing: false,
  };

  async componentDidMount() {
    const { route } = this.props;
    const { user } = route.params;
    const { page, stars, refreshing } = this.state;

    if (refreshing) {
      this.setState({ page: 1 });
    }
    if (page === 1) {
      this.setState({ starsLoading: true });
    }

    const response = await api.get(
      `/users/${user.login}/starred?page=${page}`,
      {
        params: {
          per_page: 10,
        },
      }
    );

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      starsLoading: false,
      refreshing: false,
    });
  }

  loadMore = async () => {
    const { page } = this.state;

    await this.setState({ page: page + 1 });
    this.componentDidMount();
  };

  handleNavigate = item => {
    const { navigation } = this.props;

    const repo = {
      name: item.name,
      repo_url: item.html_url,
    };

    navigation.navigate('RepoStar', { repo });
  };

  refreshList = () => {
    this.setState({ refreshing: true });
    this.componentDidMount();
  };

  render() {
    const { stars, starsLoading, refreshing } = this.state;
    const { route } = this.props;
    const { user } = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {starsLoading ? (
          <ActivityIndicator
            color="#7159c1"
            size={52}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
