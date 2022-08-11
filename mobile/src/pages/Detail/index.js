import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
   
    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou entrando em contato, para marcar uma "${incident.title}", com ${Intl.NumberFormat("pt-BR", {
    }).format(incident.value)} pessoas.`;

    function navigateback() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Agendamento - Reunião: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`Whatsapp://send?phone=+55${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                
                <TouchableOpacity onPress={navigateback}>
                    <Feather name="arrow-left" size={28} color="#E82041"/>                
                </TouchableOpacity>
            </View> 

            <View style={styles.incident}>
                   <Text style={[styles.incidentProperty, { marginTop: 0 }]}>Empresa:</Text>
                   <Text style={styles.incidentValue}>{incident.name} / {incident.uf}</Text>

                   <Text style={styles.incidentProperty}>Descrição:</Text>
                   <Text style={styles.incidentValue}>{incident.description}</Text>

                   <Text style={styles.incidentProperty}>Quantidade de Funcionários:</Text>
                   <Text style={styles.incidentValue}>{Intl.NumberFormat("pt-BR", {
                          }).format(incident.value)}</Text>
           </View>

                   <View style={styles.contactBox}>
                       <Text style={styles.heroTitle}>
                           Atenção !!
                       </Text>
                       <Text style={styles.heroTitle}>
                           Para mais detalhes.
                       </Text>

                       <Text style={styles.heroDescription}>
                           Entre em contato:
                       </Text>

                       <View style={styles.actions}>
                           <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                            <Text style={styles.actionText}>
                                    WhatsApp
                            </Text>
                           </TouchableOpacity>

                           <TouchableOpacity style={styles.action} onPress={sendMail}>
                            <Text style={styles.actionText}>
                                    E-mail
                            </Text>
                           </TouchableOpacity>

                        </View>
                   </View>           
       </View>
    );
}