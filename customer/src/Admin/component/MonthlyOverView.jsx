import { AccountCircle, TrendingUp } from '@mui/icons-material'
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react'
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';

const saleData = [
    {
        state:"360K",
        title:"Sales",
        color:"#E5D68A",
        icon:<TrendingUp sx={{fontSize:"1.75rem"}}/>
    },
    {
        state:"15.7K",
        title:"Customers",
        color:"#22CB5C",
        icon:<AccountCircle sx={{fontSize:"1.75rem"}}/>
    },
    {
        state:"1.45K",
        title:"Products",
        color:"#DE4839",
        icon:<SettingsCellIcon sx={{fontSize:"1.75rem"}}/>
    },
    {
        state:"57K",
        title:"Revenue",
        color:"#12B0E8",
        icon:<AttachMoneyIcon sx={{fontSize:"1.75rem"}}/>
    },
]

const renderState = () =>{
    return saleData.map((item,index)=>(
        <Grid item xs={12} sm={3} key={index}>
            <Box sx={{display:"flex", alignItems:"center"}}>
                <Avatar variant='rounded' sx={{
                    mr:3,
                    width:44,
                    height:44,
                    boxShadow:4,
                    color:"common.white",
                    background:`${item.color}`
                }}>
                    {item.icon}
                </Avatar>

                <Box sx={{display:"flex",flexDirection:"column"}}>
                    <Typography variant='caption'>{item.title}</Typography>
                    <Typography variant='h6'>{item.state}</Typography>
                </Box>
            </Box>
        </Grid>
    ))
}

const MonthlyOverView = () => {
  return (
    <div>
        <Card sx={{bgcolor:"#242B2E",color:"white"}}>
            <CardHeader title="Monthly Overview"
            action={
                <IconButton size='small'>
                    <MoreVertIcon/>
                </IconButton>
            }
            subheader={
                <Typography variant='body2'>
                    <Box component="span" sx={{fontWeight:600,mx:2}}>
                        Total 48.5% growth
                    </Box>
                    !!! This month
                </Typography>
            }
            titleTypographyProps={{
                sx:{
                    mb:2.5,
                    lineHeight:"2rem !important",
                    letterSpacing:".15px !important"
                }
            }}
            />
            <CardContent sx={{pt:theme=>`${theme.spacing(3)} !important`}}>
                <Grid container spacing={[5,0]}>
                    {renderState()}
                </Grid>
            </CardContent>
        </Card>
    </div>
  )
}

export default MonthlyOverView