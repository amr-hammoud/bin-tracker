import 'package:flutter/material.dart';

class MapPage extends StatefulWidget {
  const MapPage({super.key});

  @override
  State<MapPage> createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Map"),
        backgroundColor: const Color(0xff3DA35D),
        foregroundColor: const Color(0xfff7f7f7),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            const UserAccountsDrawerHeader(
              accountName: Text("Username"),
              accountEmail: Text("Email"),
            ),
            ListTile(
              title: const Text("Logout"),
              leading: const Icon(Icons.exit_to_app),
              onTap: () {
                Navigator.of(context).pushReplacementNamed('/auth');
              },
            ),
          ],
        ),
      ),
    );
  }
}
