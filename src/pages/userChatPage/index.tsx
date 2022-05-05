import React from 'react';
import {AppBar, Box, Button, Card, CardContent, Grid, Paper, TextField, Toolbar, Typography} from "@mui/material";
import {Send as SendIcon} from "@mui/icons-material";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";

import {Context} from "../../App";

const UserChatPage = observer(() => {
    const {store} = React.useContext(Context)
    const history = useHistory()
    const [messageText, setMessageText] = React.useState('')

    React.useEffect(() => {
        const userInfoStr = localStorage.getItem('userInfo')
        if (userInfoStr) {
            store.chatsStore.userInfo = JSON.parse(userInfoStr)
        } else {
            history.push('/')
        }
    }, [])

    React.useEffect(() => {
        if (store.chatsStore.userInfo) {
            store.chatsStore.joinClient()
            store.chatsStore.getCurrentChat(store.chatsStore.userInfo.email)
        }
    }, [store.chatsStore.userInfo])

    React.useEffect(() => {
        store.chatsStore.getData()
    }, [store.socket])

    const sendMessage = () => {
        store.chatsStore.chatClient(messageText)
        setMessageText('')
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            wrap="nowrap"
            style={{ minHeight: '100vh', maxHeight: '100vh' }}
        >
            <Box>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Служба поддержки
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box style={{ flexGrow: 1, minHeight: "82vh", maxHeight: "82vh" }}>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    wrap="nowrap"
                    minHeight="82vh"
                    maxHeight="82vh"
                    style={{ overflowY: 'auto', padding: '5px 10px' }}
                >
                    {
                        store.chatsStore.showedChat ?
                            store.chatsStore.showedChat.messages.map((message) => {
                                return message.username === 'Поддержка' ?
                                    <Grid item sx={{ mt: 2 }} container>
                                        <Card sx={{ borderRadius: 2 }} style={{ minWidth: '20vw', maxWidth: '45vw' }}>
                                            <CardContent>
                                                <Typography sx={{ fontSize: 14 }} color="info.main" gutterBottom>
                                                    {message.username}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {message.text}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    :
                                    <Grid item sx={{ mt: 2 }} container justifyContent="flex-end">
                                        <Card sx={{ borderRadius: 2 }} style={{ minWidth: '20vw', maxWidth: '45vw' }}>
                                            <CardContent>
                                                <Typography variant="body2">
                                                    {message.text}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                            })
                            :
                            <Grid item sx={{ mt: 2 }} container justifyContent="center">
                                <Card sx={{ borderRadius: 2 }} style={{ minWidth: '20vw', maxWidth: '45vw' }}>
                                    <CardContent>
                                        <Typography variant="h6" align="center">
                                            Здесь пока ничего нет
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                    }
                </Grid>
            </Box>
            <Box>
                <Paper>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <TextField
                            id="outlined-multiline-static"
                            label="Сообщение"
                            multiline
                            rows={3}
                            style={{ flexGrow: 1 }}
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            endIcon={<SendIcon/>}
                            onClick={() => sendMessage()}
                        >Отправить</Button>
                    </Grid>
                </Paper>
            </Box>
        </Grid>
    );
});

export default UserChatPage;