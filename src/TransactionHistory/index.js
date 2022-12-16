import { View, Text,  TouchableOpacity } from 'react-native'
import React, {  useState, useEffect } from 'react';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../utility/colors/Colors';
import { FlatList } from 'react-native-gesture-handler';
import ClientLayer from '../../components/Layers/ClientLayer';
import { useSelector, useDispatch } from 'react-redux';
import { TransactionHistoyDetails } from '../../store/Actions/TransactionHistory/TransactionHistory';
const TransactionHistoryScreen = ({ navigation }) => {
    const loading = useSelector((state) => state.transactionHistory.runLoader)
    const data = useSelector((state) => state.transactionHistory.data)
    const error = useSelector((state) => state.transactionHistory.error)
    const [TransactionHistoryArray, setTransactionHistoryArray] = useState([]);
    const dispatch = useDispatch();
    const [displayView, setDisplayView] = useState(false);
    useEffect(() => {
        ClientLayer.getInstance().getDataManager().GetValueForKey('driver_id', result => {
            dispatch(TransactionHistoyDetails({ driver_id: 3 }))
        })
    }, []);
    useEffect(() => {
        setDisplayView(loading)
        if (!loading && data != null) {
            setTransactionHistoryArray(data)
        }
        else if (!loading && error != null) {
            alert('Credentials are Wrong')
        }
    }, [loading])
    return (
        <View style={styles.container}>
                <View style={styles.mainView}>
                <View style={styles.HeaderViewStyle}>
                        <TouchableOpacity onPress={() => navigation.goBack()}
                            style={styles.OpacityStyle}>
                            <Ionicons name='arrow-back' size={25} color={Colors.getLightColor('primaryColor')}
                                style={styles.ArrowIconStyle}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.historyText}>
                        Transaction Hisotry
                    </Text>
                </View>
                <View style={styles.mappingOuterView}>
                    <FlatList
                    keyExtractor={(item, index) => {
                        return index.toString();
                    }}
                    data={TransactionHistoryArray}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={()=> navigation.navigate('DriverTransactionDetails',{
                            paramJobId: item.job_id
                        })}
                        style={styles.mappingInnerView}>
                            <View style={{ width: '65%' }}>
                                <Text style={styles.priceText}>
                                   Rs. {item.price} Pkr
                                </Text>
                                <Text style={styles.tripText}>
                                   trip to {item.to}
                                </Text>
                            </View>
                            <View style={{ width: '25%', }}>
                                <Text style={styles.tripText}>
                                    {item.date}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}>
                    </FlatList>
                </View>
        </View>
    )
};
export default TransactionHistoryScreen;
