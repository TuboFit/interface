import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import { format } from 'date-fns';


export interface TreinoProps {
    id?: string;
    crefProfessor: string;
    grupMuscular: string;
    nome: string;
    nivel: string;
    exercicios: Exercicio[];
}

export interface Exercicio {
    id?: string;
    nome: string;
    dia: string;
    grupMuscular: string,
    numRepeticoes: string,
    carga: string;
    obs?: string;
}


export interface StorageTreinoProps {
    [id: string]: {
        data: TreinoProps;
        notificationId: string
    }
}
