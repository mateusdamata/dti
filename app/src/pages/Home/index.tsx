import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack'
import { FlatList, Image } from 'react-native'
import { View, Item, Input, Button, Icon, Text, Container, Card, CardItem, Body, Grid, Col, Row } from 'native-base';
import api from '../../services/api';
import { ParamList } from '../../types';
import { connect } from 'react-redux'
import * as FilmeActions from '../../store/actions/FilmeActions'
import styles from './styles'
import { TouchableHighlight } from 'react-native-gesture-handler';

interface ratings {
  Source: string,
  Value: string,
}
interface Filmes {
  Title: string;
  Year: string;
  imdbID: String;
  Poster: String;
  Ratings: Array<ratings>;
  Metascore: string;
  imdbRating: string;
  mediaAvaliacao: number;
}

export interface HomeProps {
  navigation: StackNavigationProp<ParamList, 'Home'>
}


const Home: React.FC<HomeProps> = ({ navigation, dispatch }) => {
  const [nomeFilme, setNomeFilme] = useState<string>('');
  const [filmes, setFilmes] = useState<[Filmes]>();
  const [ordenar, setOrdenar] = useState<string>('');
  const [ordemAlfaCres, setOrdemAlfaCres] = useState<boolean>(true);
  const [ordemAvaliCres, setOrdemAvaliCres] = useState<boolean>(true);

  // const dispatch = useDispatch();

  const mediaRatings = (rating: Array<ratings>, metascore: string, imdbRating: string) => {
    const meta = parseFloat(metascore);
    const imdb = parseFloat(imdbRating);
    const rotten = parseFloat(rating[1]?.Value.replace('%', ''));

    return (meta + imdb + rotten) / 3 ;
  }

  const buscar = async () => {
    const listaNormal = await api.get(`?apikey=70dad80d&s=${nomeFilme.replace(' ', '+')}`);
    const listaFull: Array<Filmes> = listaNormal.data.Search;
    
    listaFull.map(async (film: Filmes, index) => {

      const result = await api.get(`?apikey=70dad80d&i=${film.imdbID}&plot=full`);
      const filme: Filmes = result.data
      filme.mediaAvaliacao = parseFloat(mediaRatings(filme.Ratings, filme.Metascore, filme.imdbRating).toFixed(2));
      listaFull[index] = filme;

    });
    
    setFilmes(listaFull);
  }


  const retornaFilme = () => {
    switch (ordenar) {
      case 'alfaCrescente':
        return filmes?.sort((a,b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0));
      
      case 'alfaDecrescente':
        return filmes?.sort((a,b) => (a.Title < b.Title) ? 1 : ((b.Title < a.Title) ? -1 : 0));
      
      case 'avaliDecrescente':
        return filmes?.sort((a,b) => (a.mediaAvaliacao > b.mediaAvaliacao) ? 1 : ((b.mediaAvaliacao > a.mediaAvaliacao) ? -1 : 0));
      
      case 'avaliCrescente':
        return filmes?.sort((a,b) => (a.mediaAvaliacao < b.mediaAvaliacao) ? 1 : ((b.mediaAvaliacao < a.mediaAvaliacao) ? -1 : 0));
      
      default:
        return filmes;
    }
  }

  const ordemAlfabetica = () => {
    setOrdemAlfaCres(!ordemAlfaCres);
    setOrdenar(ordemAlfaCres? 'alfaCrescente' : 'alfaDecrescente');
    retornaFilme();
  }

  const ordemAvaliacao = () => {
    setOrdemAvaliCres(!ordemAvaliCres);
    setOrdenar(ordemAvaliCres? 'avaliCrescente' : 'avaliDecrescente');
    retornaFilme();
  }

  useEffect(() => {
    setOrdemAlfaCres(true);
    setOrdemAvaliCres(true);
    buscar();
  }, [nomeFilme]);
  return (
    <>
      <View style={styles.view}>
        <Item regular>
          <Input
            placeholder="Informe o nome do filme"
            value={nomeFilme}
            onChangeText={setNomeFilme}
            onSubmitEditing={() => {
              buscar();
            }}
          />
          <Button
            icon
            transparent
            onPress={() => {
              buscar();
            }}
          >
            <Icon type="FontAwesome" name="search" />
          </Button>
        </Item>
        <Item>
          <Button
            transparent
            onPress={() => {
              ordemAlfabetica();
            }}
          >
            <Text>Ordem {ordemAlfaCres ? 'crescente' : 'decrescente'}</Text>
          </Button>
          <Button
            transparent
            onPress={() => {
              ordemAvaliacao();
            }}
          >
            <Text>Ordem por {ordemAvaliCres ? 'maior' : 'menor'} avaliação</Text>
          </Button>
        </Item>
      </View>
      <FlatList
        data={retornaFilme()}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() => {
              dispatch(FilmeActions.toggFilme(item))
              navigation.navigate('Descricao')}
            }
          >
            <Card style={styles.view}>
              <Grid>
                <Col>
                  <Image source={{ uri: item.Poster}} style={styles.img}/>
                </Col>
                <Col>
                  <Text style={styles.titulo}>{item.Title}</Text>
                  <Row>
                    <Icon type="FontAwesome5" name="star-half-alt" style={styles.icon}/>
                    <Text style={styles.avaliacao}>{item.mediaAvaliacao || 'Sem avaliação'}</Text>
                  </Row>
                </Col>
              </Grid>
            </Card>
          </TouchableHighlight>
        )}
      />
    </>
  );
};

export default connect(state => ({filme: state}))(Home);
