import React from 'react';
import {Box, AppBar, Toolbar, Typography, Button, Paper, Grid, TextField} from '@mui/material';
import {useHistory} from 'react-router-dom';
import {observer} from "mobx-react-lite";

import {UserInfo} from "../../models/UserInfo";
import {Context} from "../../App";

const LoginPage = observer(() => {
    const {store} = React.useContext(Context)
    const history = useHistory();
    const [userInfo, setUserInfo] = React.useState<UserInfo>({
        firstname: '',
        lastname: '',
        email: '',
        phone: ''
    })

    const submitForm = () => {
        store.chatsStore.userInfo = userInfo
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
        history.push('/help-chat')
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Служба поддержки
                        </Typography>
                        <Button color="inherit" onClick={() => history.push('/moder')}>Вход</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '90vh' }}
            >
                <Grid maxWidth="sm">
                    <Paper style={{ padding: '30px 20px' }}>
                        <Typography component="h1" variant="h5">
                            Информация о вас
                        </Typography>
                        <Box component="form" noValidate onSubmit={() => null} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        required
                                        fullWidth
                                        label="Имя"
                                        autoFocus
                                        value={userInfo.firstname}
                                        onChange={(e) => setUserInfo({...userInfo, firstname: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Фамилия"
                                        autoComplete="family-name"
                                        value={userInfo.lastname}
                                        onChange={(e) => setUserInfo({...userInfo, lastname: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Email"
                                        autoComplete="email"
                                        value={userInfo.email}
                                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Номер телефона"
                                        value={userInfo.phone}
                                        onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => submitForm()}
                            >
                                Задать вопрос
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
});

export default LoginPage;