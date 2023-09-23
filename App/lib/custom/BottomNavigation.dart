import 'package:flutter/material.dart';
import 'package:bin_tracker_flutter/AnnouncementsPage.dart';
import 'package:bin_tracker_flutter/ChatsPage.dart';
import 'package:bin_tracker_flutter/MapPage.dart';
import 'package:bin_tracker_flutter/ProfilePage.dart';
import 'package:bin_tracker_flutter/TruckPage.dart';

class BottomNavigation extends StatefulWidget {
  @override
  _BottomNavigationState createState() => _BottomNavigationState();
}

class _BottomNavigationState extends State<BottomNavigation> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: const Color(0xfff7f7f7),
        unselectedIconTheme: const IconThemeData(color: Color(0xff2D3A3A)),
        selectedItemColor: const Color(0xff3DA35D),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.map_rounded), label: 'Map'),
          BottomNavigationBarItem(
              icon: Icon(Icons.campaign_rounded), label: 'Announcement'),
          BottomNavigationBarItem(
              icon: Icon(Icons.chat_rounded), label: 'Chats'),
          BottomNavigationBarItem(
              icon: Icon(Icons.local_shipping_rounded), label: 'Truck'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile')
        ],
        currentIndex: _currentIndex,
        onTap: _onItemTapped,
      ),
      body: IndexedStack(
        index: _currentIndex,
        children: const [
          MapPage(),
          AnnouncementsPage(),
          ChatsPage(),
          TruckPage(),
          ProfilePage()
        ],
      ),
    );
  }

  void _onItemTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }
}
