import { Outlet, useLoaderData } from "react-router-dom"
import { useState, useEffect } from 'react'
import Navbar from "../components/Navbar"
import { getSource, getAllNews } from '../services/newsServices'
import Homepage from '../pages/Homepage'
import Source from '../pages/Source'

export default function RootLayout() {
    const { sources, allUrls, allNewsSource } = useLoaderData()

    const listSources = Object.entries(sources).map(([key, value]) => key)

    return (
        <div>
            <Navbar sources={listSources} />
            <Outlet context={{ allNewsSource }} />
            {/* <Outlet context={{ allNewsSource, endpointSource: allUrls }} /> */}
        </div>
    )
}