import ReactThreeTestRenderer from '@react-three/test-renderer';
import { act } from '@testing-library/react';
import Satellite from "..";
import { Mesh } from 'three';
import { Renderer } from '@react-three/test-renderer/dist/declarations/src/types';

const mockSatellitePosition = {
    satellite_id: 12345,
    timestamp: "2024-06-01T12:00:00Z",
    latitude: 45.0,
    longitude: -122.0,
    altitude_km: 550.0,
    velocity_kms: 7.8,
    object_name: "Hubble Space Telescope",
    norad_cat_id: "20580",
    sub_category: "storms",
    category: "Weather"
};

describe('Satellite',() => {

    test('Satellite renders a mesh with two children', async () => {
        const renderer = await ReactThreeTestRenderer.create(
            <Satellite satellite_position={mockSatellitePosition}/>
        );
        const mesh = renderer.scene.children[0].allChildren;
        expect(mesh.length).toBe(2) 
    });

    test('Satellite (weather) has the color red', async () => {
        const renderer = await ReactThreeTestRenderer.create(
            <Satellite satellite_position={mockSatellitePosition}/>
        );
        const color = renderer.scene.findByProps({ color: 'red' })

        expect(color.props.color).toBe('red');
    });

    test('On click tooltip appears with name', async () => {
        let renderer: Renderer | undefined;
        await act(async () => {
            renderer = await ReactThreeTestRenderer.create(
                <Satellite satellite_position={mockSatellitePosition}/>
            );
        });

        if (!renderer) {
            throw new Error("Renderer was not initialized");
        }

        const mesh = renderer.scene.children[0];

        await renderer.fireEvent(mesh, 'onPointerOver');
        
        const htmlTooltip = renderer.scene.find(
            node => {
                return node.type === 'Group'
            }
        );

        expect(htmlTooltip).toBeDefined();
    })
})






