import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

type Receipt = {
  baseFare: string;
  applicationFee: string;
  totalFare: string;
  duration: string;
  cardNumber: string;
  transactionDate: string;
  transactionTime: string;
} | null;

export default function App() {
  const [origin, setOrigin] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [datetime, setDatetime] = React.useState('');
  const [receipt, setReceipt] = React.useState<Receipt>(null);

  const generateReceipt = () => {
    // Simulación simple de generación de recibo
    const baseFare = (Math.random() * 50 + 50).toFixed(2);
    const applicationFee = (Math.random() * 10 + 3).toFixed(2);
    const totalFare = (parseFloat(baseFare) + parseFloat(applicationFee)).toFixed(2);
    const duration = Math.floor(Math.random() * 30 + 10) + 'min';
    const cardNumber = '4768';
    const transactionDate = datetime || new Date().toLocaleDateString();
    const transactionTime = new Date().toLocaleTimeString();

    setReceipt({
      baseFare,
      applicationFee,
      totalFare,
      duration,
      cardNumber,
      transactionDate,
      transactionTime,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Generador de Recibos DiDi</Text>

      <Text>Dirección de origen</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Polanco, CDMX"
        value={origin}
        onChangeText={setOrigin}
      />

      <Text>Dirección de destino</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Roma Norte, CDMX"
        value={destination}
        onChangeText={setDestination}
      />

      <Text>Fecha y hora del viaje</Text>
      <TextInput
        style={styles.input}
        placeholder="dd/mm/yyyy hh:mm"
        value={datetime}
        onChangeText={setDatetime}
      />

      <Button title="Generar Recibo" onPress={generateReceipt} />

      {receipt && (
        <View style={styles.receipt}>
          <Text style={styles.receiptTitle}>Detalles de la tarifa</Text>
          <Text>Tarifa total: MXN${receipt.totalFare}</Text>
          <Text>Tarifa base: MXN${receipt.baseFare}</Text>
          <Text>Cuota de solicitud: MXN${receipt.applicationFee}</Text>
          <Text>Duración del viaje: {receipt.duration}</Text>
          <Text>Tarjeta: **** **** **** {receipt.cardNumber}</Text>
          <Text>Fecha: {receipt.transactionDate}</Text>
          <Text>Hora: {receipt.transactionTime}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  receipt: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  receiptTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
