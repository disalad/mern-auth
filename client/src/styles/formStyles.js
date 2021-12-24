import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    containerBox: {
        marginTop: '4em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    helperText: {
        position: 'absolute',
        bottom: '-1.75em',
        margin: '0 !important',
    },
    gridContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridItem: {
        position: 'relative',
    },
}));

export { useStyles };
