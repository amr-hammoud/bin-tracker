import 'package:bin_tracker_flutter/auth.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bin Tracker',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
            seedColor: const Color.fromARGB(255, 70, 119, 255)),
        useMaterial3: true,
      ),
      home: const AuthPage(),
      routes: {
        '/auth': (context) => const AuthPage(),
      },
    );
  }
}
