import 'package:flutter/material.dart';

class TruckPage extends StatefulWidget {
  const TruckPage({super.key});

  @override
  State<TruckPage> createState() => _TruckPageState();
}

class _TruckPageState extends State<TruckPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Truck"),
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
                // userProvider.setUser();
                Navigator.of(context).pushReplacementNamed('/auth');
              },
            ),
          ],
        ),
      ),
    );
  }
}
