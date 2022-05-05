import React from 'react';
import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    List,
    ListItemButton, ListItemText,
    Paper,
    TextField,
    Toolbar,
    Typography
} from '@mui/material';
import {Send as SendIcon} from "@mui/icons-material";
import {observer} from "mobx-react-lite";

import {Context} from "../../App";

const ModerPage = observer(() => {
    const {store} = React.useContext(Context)
    const [messageText, setMessageText] = React.useState('')

    React.useEffect(() => {
        store.chatsStore.getAllChats()
    }, [])

    React.useEffect(() => {
        store.chatsStore.getData()
    }, [store.socket])

    const showCurrentChat = (email: string) => {
        store.chatsStore.getCurrentChat(email)
        store.chatsStore.joinModer(email)
    }

    const sendMessage = () => {
        store.chatsStore.chatModer(messageText)
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
            <Grid
                container
                style={{ flexGrow: 1 }}
            >
                <Grid
                    container
                    direction="column"
                    sx={{ boxShadow: 1 }}
                    style={{ maxWidth: '20%' }}
                >
                    <List sx={{ width: '100%', padding: 0 }}>
                        {
                            store.chatsStore.allChats ?
                                store.chatsStore.allChats.map((chat) =>
                                    <ListItemButton
                                        alignItems="flex-start"
                                        sx={{ borderBottom: 1, borderColor: 'grey.500' }}
                                        onClick={() => showCurrentChat(chat.userInfo.email)}
                                    >
                                        <ListItemText primary={chat.userInfo.firstname + ' ' + chat.userInfo.lastname} sx={{ color: "primary.main" }} />
                                    </ListItemButton>
                                )
                                :
                                <ListItemButton
                                    alignItems="flex-start"
                                    sx={{ borderBottom: 1, borderColor: 'grey.500' }}
                                >
                                    <ListItemText primary="Здесь пока ничего нет" sx={{ color: "primary.main" }} />
                                </ListItemButton>
                        }
                    </List>
                </Grid>
                <Grid
                    container
                    direction="column"
                    style={{ maxWidth: '80%' }}
                >
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
            </Grid>
        </Grid>
    );
});

export default ModerPage;