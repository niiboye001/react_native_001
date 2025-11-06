import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

const TabsLayout = () => {
  return (<>
      <Tabs>
          <Tabs.Screen 
              name='index' 
              options={{
                  title: 'Todos',
                  tabBarIcon: ({color,size}) => (
                      <Ionicons name='flash-outline' />
                  )
              }} 
          />
          <Tabs.Screen 
              name='settings' 
              options={{
                  title: 'Settings',
                  tabBarIcon: ({color,size}) => (
                      <Ionicons name='settings' />
                  )
              }} 
          />
      </Tabs>
    </>)
}

export default TabsLayout