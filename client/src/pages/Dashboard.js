import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useStyles } from '../styles/dashboardStyles';

function Dashboard() {
    const {
        currentUser: {
            user: { username, email, imgUrl },
        },
        deleteUser,
    } = useAuth();
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={<Avatar src={imgUrl} alt='display picture' />}
                    className={classes.cardHeader}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant='h5' component='div' alignSelf='center'>
                        Username: {username}
                    </Typography>
                    <Typography gutterBottom variant='h5' component='div' alignSelf='center'>
                        Email: {email}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant='outlined'>
                        <Link to='/settings/profile' className={classes.link}>
                            Edit Profile
                        </Link>
                    </Button>
                    <Button variant='contained' color='error' onClick={ev => deleteUser(email)}>
                        Delete My Account
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default Dashboard;
