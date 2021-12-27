import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useStyles } from '../styles/editProfileStyles';

function EditProfile() {
    const {
        currentUser: {
            user: { username },
        },
        updateDetails,
    } = useAuth();
    const classes = useStyles();
    const navigate = useNavigate();
    const [usernameVal, setUsernameVal] = useState('');

    const updateProfileHandler = ev => {
        if (!usernameVal || usernameVal === username) {
            console.log('No Change');
            navigate('/');
        } else {
            console.log('Change');
            updateDetails(usernameVal);
        }
    };

    return (
        <Box className={classes.box}>
            <Card className={classes.card}>
                <Button className={classes.btn} onClick={ev => navigate('/')}>
                    Back
                </Button>
                <CardHeader
                    avatar={<Avatar src='/default_dp.png' alt='display picture' />}
                    className={classes.cardHeader}
                />
                <CardContent className={classes.cardContent}>
                    <Grid container direction={'column'} spacing={5}>
                        <Grid item>
                            <TextField
                                id='outlined-helperText'
                                label='Username'
                                defaultValue={username}
                                onChange={ev => setUsernameVal(ev.target.value)}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button variant='contained' onClick={updateProfileHandler}>
                        Save
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default EditProfile;
