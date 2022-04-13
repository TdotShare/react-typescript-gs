import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Container, Grid, Link, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setBreadCms } from './../../../store/reducer/Breadcrumbs'
import { setTitle } from './../../../store/reducer/TitleHeader'
import { routerPathProtected } from '../../../router/RouterPath'
import { GSindex, TAPIdata } from '../../../model/Gsindexs'
import axios from 'axios'
import { systemConfig } from '../../../config/System'
import { useSelector } from 'react-redux'
import { RootState } from './../../../store/ConfigureStore'
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}


function Gsindex() {

    const columns: GridColDef[] = [
        {
            flex : 1 ,
            field : "FIELD_NOT_EXSITS",
            headerName : "",
            width: 130,
            valueGetter : (params) => params.api.getRowIndex(params.row.id) + 1 ,
        },
        {
            field: "image_profile",
            headerName: "รูปภาพประจำตัว",
            sortable: false,
            width: 130,
            renderCell: (params) => {

                const data: GSindex = params.row

                return (
                    <Avatar alt={`${data.scholar_id}`} src={`https://scholar.googleusercontent.com/citations?view_op=view_photo&user=${data.scholar_id}`} />
                );
            }
        },
        {
            field: "fullname",
            headerName: "Name Google Schola",
            width: 350,
            renderCell: (params) => {

                return (
                    <Link component="button" onClick={() => window.open(`https://scholar.google.com/citations?hl=th&authuser=1&user=${params.row.scholar_id}`, "_blank")} >
                        <Typography >{params.row.fullname}</Typography>
                    </Link>
                );
            }
        },
        { field: 'university_name', headerName: 'From', width: 150 },
        { field: 'h_index', headerName: 'Hindex', width: 150 },
        { field: 'iten_index', headerName: 'I10index', width: 150 },
        { field: 'reference', headerName: 'Reference', width: 150 },
        { field: 'update_at', headerName: 'อัปเดตล่าสุดเมื่อ', width: 200 },
    ];

    // { field: 'h_index2016', headerName: 'Hindex2016', width: 150 },
    // { field: 'iten_index2016', headerName: 'I10index2016', width: 150 },
    // { field: 'reference2016', headerName: 'Reference2016', width: 150 },

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

                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Container >
                <div style={{ padding: '2%', height: 500, width: '100%' }}>
                    <DataGrid
                        components={{
                            Toolbar: CustomToolbar,
                        }}
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