import React, { useEffect, useState } from 'react'
import Paperbase from '../../../template/Paperbase'
import { AppBar, Button, Container, Grid, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setBreadCms } from './../../../store/reducer/Breadcrumbs'
import { setTitle } from './../../../store/reducer/TitleHeader'
import { routerPathProtected } from '../../../router/RouterPath'
import { GSindex, TAPIdata } from '../../../model/Gsindexs'
import axios from 'axios'
import { systemConfig } from '../../../config/System'
import { useSelector } from 'react-redux'
import { RootState } from './../../../store/ConfigureStore'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

function Gsindex() {

    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    const columns: GridColDef[] = [
        { field: 'fullname', headerName: 'Name Google Scholar', width: 350 },
        { field: 'scholar_id', headerName: 'Code GSR', width: 150 },
        { field: 'university_name', headerName: 'From', width: 150 },
        { field: 'h_index', headerName: 'Hindex', width: 150 },
        { field: 'iten_index', headerName: 'I10index', width: 150 },
        { field: 'reference', headerName: 'Reference', width: 150 },
        { field: 'h_index2016', headerName: 'Hindex2016', width: 150 },
        { field: 'iten_index2016', headerName: 'I10index2016', width: 150 },
        { field: 'reference2016', headerName: 'Reference2016', width: 150 },
        { field: 'update_at', headerName: 'อัปเดตล่าสุดเมื่อ', width: 200 },
    ];

    const dispatch = useDispatch()

    const [title] = useState<string>("G - scholar Index")
    const [model, setModel] = useState<GSindex[]>([])

    const user = useSelector((state: RootState) => state.user.data)

    const actionGetIndex = async () => {
        const data = await axios.get<TAPIdata>(`${systemConfig.API}/gsprofile/getindex`, { headers: { 'Authorization': `Bearer ${user.token}` } });
        if (data.data.bypass) {
            setModel(data.data.data)
        }
    };

    useEffect(() => {
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtected.Dashboard, active: false, },
            { value: title, link: "", active: true, }
        ]))
        dispatch(setTitle(title))
        actionGetIndex()
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            >
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                            <Typography >{title}</Typography>
                        </Grid>
                        <Grid item>
                            <Button disabled variant="contained" sx={{ mr: 1 }}>
                                Export Execl
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Container >
                <div style={{ padding: '2%', height: 500, width: '100%' }}>
                    <DataGrid
                        rows={model ? model : []}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        disableSelectionOnClick={true}
                    />
                </div>
            </Container>
        </>
    )
}

export default Gsindex