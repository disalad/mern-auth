import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import { useStyles } from '../styles/formStyles';
import { emailValidation, passwordValidation, usernameValidation } from '../utils/validation';

function LogIn() {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstNameErr, setFirstNameErr] = useState(null);
    const [secNameErr, setSecNameErr] = useState(null);
    const [emailErr, setEmailErr] = useState(null);
    const [passwdErr, setPasswdErr] = useState(null);
    const classes = useStyles();

    const formSubmitHandler = ev => {
        ev.preventDefault();
        validateForm() ? console.error('ERROR') : console.warn('SUCCESS');
    };

    const validateForm = () => {
        const firstNameError = usernameValidation(firstName);
        const secNameError = usernameValidation(secondName);
        const emailError = emailValidation(email);
        const passwordError = passwordValidation(password);

        firstNameError ? setFirstNameErr('First name is too short') : setFirstNameErr(null);
        secNameError ? setSecNameErr('Second name is too short') : setSecNameErr(null);
        emailError ? setEmailErr('Email is not valid') : setEmailErr(null);
        passwordError ? setPasswdErr('Please enter a strong password') : setPasswdErr(null);

        if (!firstNameError && !secNameError && !emailError && !passwordError) {
            return true;
        } else {
            return false;
        }
        // return !firstNameError && !secNameError && !emailError && !passwordError ? false : true;
    };

    return (
        <Container maxWidth='xs'>
            <Box
                container
                direction='column'
                alignItems='center'
                justifyContent='center'
                className={classes.containerBox}
            >
                <Avatar sx={{ bgcolor: 'primary.main', color: 'common.white', margin: 1 }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <Box component='form' noValidate onSubmit={formSubmitHandler} sx={{ mt: 3 }}>
                    <Grid container spacing={2} className={classes.gridContainer}>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                label='First Name'
                                variant='outlined'
                                error={firstNameErr ? true : false}
                                helperText={firstNameErr}
                                onChange={ev => setFirstName(ev.target.value)}
                                sx={{ mb: 2 }}
                                FormHelperTextProps={{
                                    classes: {
                                        root: classes.helperText,
                                    },
                                }}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} sx={{ position: 'relative' }}>
                            <TextField
                                label='Second Name'
                                variant='outlined'
                                error={secNameErr ? true : false}
                                helperText={secNameErr}
                                onChange={ev => setSecondName(ev.target.value)}
                                sx={{ mb: 2 }}
                                FormHelperTextProps={{
                                    classes: {
                                        root: classes.helperText,
                                    },
                                }}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <TextField
                                label='Email Address'
                                variant='outlined'
                                error={emailErr ? true : false}
                                helperText={emailErr}
                                onChange={ev => setEmail(ev.target.value)}
                                sx={{ mb: 2 }}
                                FormHelperTextProps={{
                                    classes: {
                                        root: classes.helperText,
                                    },
                                }}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <TextField
                                label='Password'
                                variant='outlined'
                                error={passwdErr ? true : false}
                                helperText={passwdErr}
                                onChange={ev => setPassword(ev.target.value)}
                                FormHelperTextProps={{
                                    classes: {
                                        root: classes.helperText,
                                    },
                                }}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 4, mb: 2 }}>
                        Sign Up
                    </Button>
                </Box>
                <Typography component='h2' variant='h6' sx={{ mt: 1, cursor: 'pointer' }}>
                    Already Have an Account? <Link>Sign Up</Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default LogIn;
