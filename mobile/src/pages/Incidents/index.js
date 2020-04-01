import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoagind] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incident) {        
        navigation.navigate('Detail', { incident });

    }

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length == total) {
            return;
        }

        setLoagind(true);

        const response = await api.get('incidents' , {
            params: { page }
        });
        
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoagind(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                 Total de <Text style={styles.headerTextBold}>{total} empresas.</Text>
                </Text>
            </View>      

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.title2}>Desenvolvido por: </Text>
            <Text style={styles.title3}>Alisson de Andrade Araújo</Text>
            <Text style={styles.description}>Escolha uma empresa, e veja mais detalhes.</Text> 
       
            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>Empresa:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>


                        <Text style={styles.incidentProperty}>Descrição:</Text>
                        <Text style={styles.incidentValue}>{incident.description}</Text>


                        <Text style={styles.incidentProperty}>Quantidade de Funcionários:</Text>
                        <Text style={styles.incidentValue}>{
                            Intl.NumberFormat("pt-BR", {
                          }).format(incident.value)}
                        </Text>                        

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetail(incident)}
                            >

                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity> 
                    </View>    
            )} 
            />
        
            </View>
        
    );
}