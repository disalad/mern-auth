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

function Dashboard() {
    const {
        currentUser: {
            user: { username, email },
        },
    } = useAuth();
    return (
        <Box
            display='flex'
            width='100vw'
            height='100vh'
            alignItems='center'
            justifyContent='center'
        >
            <Card
                style={{
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1em',
                    width: '50vw',
                }}
            >
                <CardHeader
                    avatar={<Avatar src='/default_dp.png' alt='display picture' />}
                    style={{ width: 'max-content', height: '1em' }}
                />
                <CardContent style={{ width: '100%' }} style={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant='h5' component='div' alignSelf='center'>
                        Username: {username}
                    </Typography>
                    <Typography gutterBottom variant='h5' component='div' alignSelf='center'>
                        Email: {email}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant='outlined'>
                        <Link
                            to='/settings/profile'
                            style={{ textDecoration: 'none', color: 'unset' }}
                        >
                            Edit Profile
                        </Link>
                    </Button>
                    <Button variant='contained' color='error'>
                        Delete My Account
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default Dashboard;
