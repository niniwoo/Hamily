import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { question } from './question';
import { Setting } from './Setting';
import { Calendar } from './Calandar';
import { SeccretBox } from './SecretBox';
import { Chat } from './Chat';
import { BrowserRouter as Routes} from 'react-router-dom'

const Tab = createBottomTabNavigator();

function BottomTabNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={Routes.question}component={question} />
      <Tab.Screen name={Routes.Chat}component={Chat} />
      <Tab.Screen name={Routes.Calendar}component={Calendar} />
      <Tab.Screen name={Routes.SeccretBox}component={SeccretBox} />
      <Tab.Screen name={Routes.Setting} component={Setting} />
    </Tab.Navigator>
  );
}

export default BottomTabNav;