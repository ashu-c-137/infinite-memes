import { View, Text, Image, SafeAreaView, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const memeSubreddit = [
    'memes',
    'AdviceAnimals',
    'AdviceAnimals+funny+memes',
    'funny',
    'PrequelMemes',
    'SequelMemes',
    'MemeEconomy',
    'ComedyCemetery',
    'dankmemes',
    'terriblefacebookmemes',
    'shittyadviceanimals',
    'wholesomememes',
    'me_irl',
    '2meirl4meirl',
    'i_irl',
    'meirl',
    'BikiniBottomTwitter',
    'trippinthroughtime',
    'boottoobig',
    'HistoryMemes',
    'OTMemes',
    'starterpacks',
    'gifs',
    'rickandmorty',
    'FellowKids',
    'Memes_Of_The_Dank',
    'raimimemes',
    'comedyhomicide',
    'lotrmemes',
    'freefolk',
    'GameOfThronesMemes',
    'howyoudoin',
    'HolUp',
    'meme',
    'memeswithoutmods',
    'dankmeme',
    'suicidebywords',
    'puns',
    'PerfectTiming'
];

let listRefView;



export default function memeGenerator() {
    const [data, setData] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)
    useEffect(() => {
        const random = Math.floor(Math.random() * memeSubreddit.length);
        const subreddit = memeSubreddit[random]
        axios
            .get(`https://api.reddit.com/r/${subreddit}`)
            .then((res) => {
                setData(res.data.data.children)
                console.log(res.data.data.children.slice(0,5))
            })
    }, [])

    const topButtonHandler = () => {
        listRefView.scrollToOffset({ offset: 0, animated: true })
    }

    const ListFooter = () => (
          
        <Text style={{fontWeight: 'bold', fontSize: 20, margin: 10, marginBottom: 20, color: '#ff4500' }}>
            {"Loading..."}
            </Text>
    );  

    const renderItem = ({ item }) => {
        
        if(item.data.is_video === false){
        return (
            <View >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                    <Text style={{ color: 'grey' }}>
                        {"Posted by u/: " + item.data.author + ' in r/' + item.data.subreddit + '\n' + moment.unix(item.data.created).fromNow() }
                    </Text>
                </View>
        
                    <Text style={{ fontSize: 20, margin: 16, color: 'white', width: '82%' }}>
                    {item.data.title}
                </Text>
               
                <Image
                    style={{ height: 400, width: 400, alignSelf: 'center', margin: 16, resizeMode: 'contain' }}
                    source={{
                        uri: item.data.url
                    }}

                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                   
                    <Text style={{fontSize: 15, color: '#ff4500' }}>
                        {"Liked by: " + item.data.ups + ' people'}
                    </Text>
         

                </View>
            </View>

        )}
        else{
            return null
        }
    }

    const ListHeaderComponent = () => {
        return (
            <View style={{flexDirection:'row'}}>
            <Image
            style={{height: 80, width: 80, borderRadius: 50, margin: 20}}
            source={{
                uri:'https://styles.redditmedia.com/t5_2qjpg/styles/communityIcon_4fv0susv2j981.png'
            }}
            />
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                color:'white',
                alignSelf: 'center'
            }}>{"Infinite Memes"}</Text>
            </View>
        )
    }

    const onEndReached = () => {
        const random = Math.floor(Math.random() * memeSubreddit.length);
        const subreddit = memeSubreddit[random]
        axios
            .get(`https://api.reddit.com/r/${subreddit}`)
            .then((res) => {
                setData(res.data.data.children)
                console.log(res.data.data.children.slice(0,5))
            })
    }

    const ItemSeparatorComponent = () => {
        return (
            <View
                style={{ height: 2, width: '100%', backgroundColor: 'grey' }}
            />
        )
    }
    const onRefresh = () => {
        setIsRefreshing(true)
        const random = Math.floor(Math.random() * memeSubreddit.length);
        const subreddit = memeSubreddit[random]
        axios
            .get(`https://api.reddit.com/r/${subreddit}`)
            .then((res) => {
                setData(res.data.data.children)
                console.log(res.data.data.children.slice(0,5))
            })
        setIsRefreshing(false)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
            
            <FlatList
                data={data}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparatorComponent}
                ListHeaderComponent = {ListHeaderComponent}
                onEndReached = {onEndReached}
                onEndReachedThreshold = {0.8}
                refreshControl = {
                    <RefreshControl
                    refreshing = {isRefreshing}
                    onRefresh = {onRefresh}
                    tintColor = 'red'
                    />
                }
                ref={(ref) => {
                    listRefView = ref
                }}
                ListFooterComponent = {ListFooter}
            />

<TouchableOpacity
                onPress={topButtonHandler}
                style={{ backgroundColor: '#ff4500', borderRadius: 50, height: 50, width: 50, bottom: 50, right: 30, position: 'absolute', justifyContent: 'center', alignItems: 'center', opacity: 0.8 }}>
                <Text style={{ color: 'white', fontSize: 20 }} >
                    {"↑"}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}