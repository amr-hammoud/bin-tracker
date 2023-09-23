import 'package:bin_tracker_flutter/custom/BottomNavigation.dart';
import 'package:bin_tracker_flutter/helpers/AuthHelpers.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'auth.dart';
import 'providers/UserProvider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({super.key});
  final auth = AuthHelpers();  

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => UserProvider(),
      builder: (context, child) {
        return MaterialApp(
          title: 'Bin Tracker',
          theme: ThemeData(
            colorScheme:
                ColorScheme.fromSeed(seedColor: const Color(0xff3DA35D)),
            fontFamily: 'Poppins',
            useMaterial3: true,
          ),
          home: FutureBuilder<bool>(
            future: auth.checkLoggedIn(context),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return Container(
                  width: 50,
                  height: 50,
                  child: const CircularProgressIndicator(
                    valueColor:
                        AlwaysStoppedAnimation<Color>(Color(0xff3DA35D)),
                    backgroundColor: Colors.grey,
                  ),
                );
              } else if (snapshot.hasError) {
                return Scaffold(
                  body: Center(
                    child: Text('Error: ${snapshot.error.toString()}'),
                  ),
                );
              } else if (snapshot.data == true) {
                return BottomNavigation();
              } else {
                return AuthPage();
              }
            },
          ),
          routes: {
            '/auth': (context) => const AuthPage(),
          },
        );
      },
    );
  }
}
