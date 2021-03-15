import { Text, Card, CardItem } from 'native-base';
import React from 'react';
import { View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import styles from './styles'

interface Filmes {
  Title: string;
  Actors: string;
  Year: string;
  Genre: string;
  Director: string;
  Runtime: string;
  imdbID: String;
  Poster: String;
  Metascore: string;
  imdbRating: string;
  Awards: string;
  Plot: string;
  mediaAvaliacao: number;
}

interface DescricaoProp {
  filme: Filmes
}

const Descricao: React.FC<DescricaoProp> = ({filme}) => {  
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.view}>
        <Text style={styles.filme}> {filme.Title || '-'} ({filme.Year || '-'})  </Text>
        <CardItem cardBody>
          <Image source={{ uri: filme.Poster}} style={styles.img}/>
        </CardItem>
        <Text>
          <Text style={styles.titulo}>Atores:</Text> {filme.Actors || '-'}
        </Text>
        <Text>
          <Text style={styles.titulo}>Duração:</Text> {filme.Runtime || '-'}
        </Text>
        <Text>
          <Text style={styles.titulo}>Genero:</Text> {filme.Genre || '-'}
        </Text>
        <Text>
          <Text style={styles.titulo}>Director:</Text> {filme.Director || '-'}
        </Text>
        <Text>
          <Text style={styles.titulo}>Descrição:</Text> {filme.Plot || '-'}
        </Text>
        <Text>
          <Text style={styles.titulo}>Prêmios:</Text> {filme.Awards || '-'}
        </Text>
        <Text>
          <Text style={styles.titulo}>Avaliação média:</Text> {filme.mediaAvaliacao || '-'}
        </Text>
      </Card>
    </ScrollView>
  )
}

export default connect(state => ({ filme: state.FilmeReducer.filme }))(Descricao);