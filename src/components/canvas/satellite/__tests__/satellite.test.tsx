import ReactThreeTestRenderer from '@react-three/test-renderer';
import SatelliteContainer from '..';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';

jest.mock('@/services/api', () => ({
    useGetSatellitePositionsQuery: jest.fn(() => ({
        data: [
            {
                tle_line1: '1 25544U 98067A   20029.54791435  .00001264  00000-0  29621-4 0  9993',
                tle_line2: '2 25544  51.6434  21.2062 0007417  36.5655  52.6186 15.49180526210616',
                object_name: 'Hubble Space Telescope',
                category: 'Weather'
            }
        ],
        isLoading: false,
        isError: false
    })),
    satellitePositionsApi: {
        reducerPath: 'satellitePositionsApi',
        reducer: (state = {}, action: any) => state, // dummy reducer
        middleware: () => (next: (arg0: any) => any) => (action: any) => next(action), // dummy middleware
    }
}))

describe('Satellite', () => {

    const component = (
        <Provider store={store}>
            <SatelliteContainer />
        </Provider>
    )

    test('Satellite renders a mesh with two children', async () => {
        const renderer = await ReactThreeTestRenderer.create(
            component
        );
        const mesh = renderer.scene.children[0].allChildren;
        expect(mesh.length).toBe(2)
    });

    test('Satellite (weather) has the color red', async () => {
        const renderer = await ReactThreeTestRenderer.create(
            component
        );
        const mesh = renderer.scene.children[0];

        const material = mesh.allChildren.find(child => child.type === 'meshStandardMaterial' && child.props.color === 'red');

        expect(material).toBeDefined();
        expect(material?.props.color).toBe('red');
    });


})






